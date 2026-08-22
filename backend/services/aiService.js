import fs from 'fs';
import path from 'path';

// Known technology & professional skill dictionary for deterministic NLP parsing
const KNOWN_SKILLS = [
  'React', 'React.js', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'TypeScript', 'JavaScript',
  'Python', 'Django', 'FastAPI', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET', 'Go', 'Rust', 'PHP', 'Laravel',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST APIs', 'Microservices',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux',
  'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'Redux', 'Zustand', 'React Native', 'Flutter', 'Swift', 'Kotlin',
  'AI', 'Machine Learning', 'OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Data Analysis',
  'Git', 'GitHub', 'Agile', 'Scrum', 'Jira', 'UI/UX Design', 'Figma'
];

/**
 * Extract text from PDF or DOC/DOCX safely
 */
export const extractTextFromResume = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return '';
    }
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const pdfParse = (await import('pdf-parse')).default;
      const data = await pdfParse(dataBuffer);
      return data.text || '';
    } catch (e) {
      return dataBuffer.toString('utf-8');
    }
  } catch (err) {
    console.error('Error extracting text from resume:', err.message);
    return '';
  }
};

/**
 * AI Candidate Resume Parser & Match Scorer
 * Deterministic NLP + Skill matching engine comparing candidate data directly with job requirements
 */
export const analyzeCandidateResume = async ({ resumeText, candidate, job }) => {
  try {
    const rawText = `${resumeText || ''} ${candidate.coverLetter || ''} ${candidate.yearsExperience || ''} ${candidate.currentRole || ''}`.trim();
    
    if (!rawText || rawText.length < 10) {
      return {
        aiMatchScore: 50,
        aiScoreBreakdown: {
          technicalSkills: 50,
          experience: 50,
          roleRelevance: 50,
        },
        aiParsedSkills: [],
        aiStrongMatches: [],
        aiMissingSkills: (job.skills || []).slice(0, 3),
        aiSummary: 'Minimal text could be extracted from uploaded file. Manual recruiter review is recommended.',
      };
    }

    const lowerText = rawText.toLowerCase();

    // 1. Detect skills in resume
    const detectedSkills = [];
    KNOWN_SKILLS.forEach((skill) => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(lowerText)) {
        detectedSkills.push(skill);
      }
    });

    // 2. Identify required job skills
    let targetSkills = [];
    if (job.skills && Array.isArray(job.skills) && job.skills.length > 0) {
      targetSkills = job.skills;
    } else if (job.requirements && Array.isArray(job.requirements)) {
      targetSkills = job.requirements.join(' ').split(/[,;\n]+/).map(s => s.trim()).filter(s => s.length > 2);
    } else {
      targetSkills = ['Software Development', 'Problem Solving', 'Team Collaboration'];
    }

    const strongMatches = [];
    const missingSkills = [];

    targetSkills.forEach((req) => {
      const cleanReq = req.trim();
      if (!cleanReq) return;
      const isMatched = detectedSkills.some(s => s.toLowerCase() === cleanReq.toLowerCase()) ||
                        lowerText.includes(cleanReq.toLowerCase());
      if (isMatched) {
        if (!strongMatches.includes(cleanReq)) strongMatches.push(cleanReq);
      } else {
        if (!missingSkills.includes(cleanReq)) missingSkills.push(cleanReq);
      }
    });

    // 3. Compute Deterministic Technical Score
    const matchCount = strongMatches.length;
    const totalTarget = Math.max(targetSkills.length, 1);
    const skillRatio = matchCount / totalTarget;

    // Technical score (50 base + 50 * ratio)
    const technicalScore = Math.min(100, Math.round(50 + (skillRatio * 50)));

    // Experience Score Calculation
    let expScore = 70;
    const expNum = parseInt(candidate.yearsExperience) || 0;
    if (expNum >= 6) expScore = 95;
    else if (expNum >= 4) expScore = 88;
    else if (expNum >= 2) expScore = 80;
    else if (expNum >= 1) expScore = 72;
    else expScore = 65;

    // Role relevance based on detected keywords and role alignment
    const roleRelevance = Math.round((technicalScore * 0.6) + (expScore * 0.4));
    const overallMatch = Math.round((technicalScore * 0.5) + (expScore * 0.3) + (roleRelevance * 0.2));

    // Structured AI Summary
    let summary = `Candidate demonstrates ${overallMatch >= 80 ? 'strong' : overallMatch >= 65 ? 'moderate' : 'basic'} technical alignment for the ${job.title || 'position'} role with detected skills in ${detectedSkills.slice(0, 4).join(', ') || 'software technologies'}. `;
    if (strongMatches.length > 0) {
      summary += `Key matching criteria include: ${strongMatches.slice(0, 3).join(', ')}. `;
    }
    if (missingSkills.length > 0) {
      summary += `Areas for technical interview verification: ${missingSkills.slice(0, 3).join(', ')}.`;
    } else {
      summary += `Profile meets or exceeds all core required competencies.`;
    }

    return {
      aiMatchScore: overallMatch,
      aiScoreBreakdown: {
        technicalSkills: technicalScore,
        experience: expScore,
        roleRelevance: roleRelevance,
      },
      aiParsedSkills: detectedSkills,
      aiStrongMatches: strongMatches.length > 0 ? strongMatches : detectedSkills.slice(0, 3),
      aiMissingSkills: missingSkills.slice(0, 4),
      aiSummary: summary,
    };
  } catch (err) {
    console.error('Error in analyzeCandidateResume:', err.message);
    return {
      aiMatchScore: 0,
      aiScoreBreakdown: { technicalSkills: 0, experience: 0, roleRelevance: 0 },
      aiParsedSkills: [],
      aiStrongMatches: [],
      aiMissingSkills: [],
      aiSummary: 'AI analysis unavailable for this file format. Manual resume inspection required.',
    };
  }
};

/**
 * AI Lead Priority Scorer
 * Categorizes client leads based on message content, enterprise terms, budget, and spam heuristics
 */
export const scoreLeadPriority = async (leadData) => {
  try {
    const text = `${leadData.name} ${leadData.company} ${leadData.service} ${leadData.budget} ${leadData.message}`.toLowerCase();
    
    // 1. Spam detection
    const spamWords = ['viagra', 'casino', 'free crypto', 'seo rank fast', 'buy backlinks', 'lottery', 'crypto trading bot'];
    const isSpam = spamWords.some(w => text.includes(w));

    if (isSpam) {
      return {
        aiPriority: 'Spam',
        aiAnalysis: 'Inquiry contains flagged promotional or non-business solicitations.',
      };
    }

    // 2. High Value / Enterprise Indicators
    const highBudgetWords = ['$20', '$30', '$50', '$100', '20k', '50k', '100k', 'enterprise', 'urgent', 'hiring team', 'dedicated developers', 'full team', 'scale', 'infrastructure', 'mvp'];
    const isHighValue = highBudgetWords.some(w => text.includes(w)) || (leadData.budget && leadData.budget.includes('$10k+'));

    if (isHighValue) {
      return {
        aiPriority: 'High',
        aiAnalysis: 'High commercial intent identified with substantial project scope or enterprise resource requirements.',
      };
    }

    // 3. Medium Priority Business Inquiries
    if (leadData.message && leadData.message.length > 35) {
      return {
        aiPriority: 'Medium',
        aiAnalysis: 'Genuine business requirement identified. Recommended for direct technology advisory consultation.',
      };
    }

    return {
      aiPriority: 'General',
      aiAnalysis: 'Standard exploratory inquiry received. Standard consultation turnaround recommended.',
    };
  } catch (err) {
    return {
      aiPriority: 'General',
      aiAnalysis: 'AI analysis unavailable - awaiting manual review.',
    };
  }
};

/**
 * AI Blog & SEO Generator
 */
export const generateAIBlog = async ({ topic, category = 'Technology & AI', author = 'Renovia Talent Editorial' }) => {
  const cleanSlug = topic
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  const title = topic.includes('?') ? topic : `${topic}: Key Strategies for Modern Engineering Teams`;
  
  const content = `## Executive Overview

As enterprise digital products expand, staying ahead in **${topic}** is critical to maintaining operational agility and technological edge. Renovia Talent empowers global organizations by pairing high-performance engineering with top-tier technical talent.

---

### Key Industry Drivers & Strategic Challenges

Modern engineering leaders face challenges across three fundamental pillars:
1. **Architectural Scalability**: Designing resilient microservices and cloud infrastructure that scale seamlessly under peak load.
2. **Talent Velocity**: Rapidly sourcing and integrating vetted engineers who understand modern CI/CD, cloud, and AI paradigms.
3. **AI & Automation Integration**: Deploying production-ready LLMs and intelligent workflow automation safely.

\`\`\`javascript
// Example: Scalable distributed pipeline integration
export const processPipelineTask = async (taskPayload) => {
  const context = await initDistributedContext({ source: 'renovia-nexus' });
  return await executeEnterprisePipeline(taskPayload, context);
};
\`\`\`

---

### Strategic Recommendations

* **Standardize Modern Best Practices**: Enforce automated testing, containerization, and infrastructure-as-code across all deployment environments.
* **Integrate AI Capabilities**: Automate routine maintenance and code quality checks to maximize engineering productivity.
* **Leverage Dedicated Engineering Squads**: Augment your internal team with specialized remote engineers to hit aggressive delivery milestones.

---

### Conclusion

Successfully navigating **${topic}** requires both deep technical craftsmanship and agile talent execution. Contact Renovia Talent's technology advisory team today to discuss how we can accelerate your roadmap.`;

  return {
    title,
    slug: cleanSlug,
    category,
    readTime: '6 min read',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    excerpt: `Discover the strategic engineering principles and actionable workforce insights behind ${topic} in modern enterprise ecosystems.`,
    content,
    status: 'published',
    author: {
      name: author,
      role: 'Technology & AI Strategist',
      avatar: '',
    },
    seoTitle: `${title} | Renovia Talent Insights`,
    seoDescription: `Comprehensive guide and strategic analysis on ${topic} for enterprise engineering leaders and technology decision makers.`,
    tags: [category, 'Engineering', 'Digital Transformation', 'AI & Cloud'],
  };
};

/**
 * AI Job Description Generator
 */
export const generateAIJobDescription = async ({ roleTitle, department, experienceLevel, workplaceType = 'Remote' }) => {
  return {
    title: roleTitle,
    department: department || 'Engineering',
    location: workplaceType === 'Remote' ? 'Remote / Global' : 'Hybrid / Global',
    type: 'Full-time',
    workplaceType,
    experienceLevel: experienceLevel || 'Mid-Senior Level (3-6 Years)',
    salaryRange: '$70,000 - $110,000 USD / Annual + Comprehensive Benefits',
    description: `Renovia Talent is looking for a talented and driven ${roleTitle} to join our high-velocity engineering ecosystem. In this role, you will architect, build, and maintain mission-critical digital products for our global enterprise clients while collaborating with elite distributed teams.`,
    responsibilities: [
      `Design, build, and maintain robust, scalable software architecture aligned with modern engineering standards.`,
      `Collaborate with cross-functional teams including product managers, UI/UX designers, and cloud architects.`,
      `Write clean, testable, and well-documented code with strong test coverage (Unit & Integration tests).`,
      `Participate in peer code reviews, sprint planning, and architectural discussions.`,
      `Continuously optimize application performance, responsiveness, and security compliance.`
    ],
    requirements: [
      `3+ years of proven professional software engineering experience with relevant technologies.`,
      `Strong proficiency in modern programming languages, frameworks, and cloud ecosystem tools.`,
      `Solid understanding of RESTful APIs, microservices architecture, and database management (SQL / NoSQL).`,
      `Experience working with version control systems (Git) and CI/CD deployment pipelines.`,
      `Exceptional problem-solving mindset with strong communication skills in English.`
    ],
    skills: [
      'Problem Solving', 'System Design', 'Git', 'Agile/Scrum', 'REST APIs', 'Cloud Computing'
    ],
    screeningQuestions: [
      `How many years of commercial experience do you have with this tech stack?`,
      `Can you describe a complex system or feature you built from scratch?`,
      `Are you comfortable working in an asynchronous, remote-first global environment?`
    ],
    deadline: 'Open until filled',
    isActive: true,
  };
};

/**
 * RAG AI Website Assistant
 * Knowledge base covering all services, solutions, talent recruitment, contact, and tech stack
 */
export const getWebsiteAssistantResponse = async (userMessage, history = []) => {
  const msg = userMessage.toLowerCase();

  if (msg.includes('service') || msg.includes('what do you do') || msg.includes('capability') || msg.includes('offer')) {
    return `Renovia Talent operates as a unified Technology and Talent Partner. Our core capabilities include:
1. **Software & Technology Development** (Web & Mobile Apps, Cloud Engineering, Custom APIs, AI Solutions)
2. **IT Support & Infrastructure** (24/7 Monitoring, Cloud Management, Digital Ops)
3. **Talent & Recruitment Solutions** (Specialized Tech Hiring, Staffing, Dedicated Remote Engineering Teams)

Would you like to speak directly with our team or schedule a consultation?`;
  }

  if (msg.includes('job') || msg.includes('career') || msg.includes('apply') || msg.includes('hiring') || msg.includes('vacancy')) {
    return `We are actively hiring top engineers, designers, and tech specialists worldwide! You can view our open positions and submit your resume directly on our **Careers** page. Our AI-assisted ATS automatically reviews applications for swift feedback.`;
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('quote') || msg.includes('budget') || msg.includes('rate')) {
    return `Our engagement models are tailored to each client's specific technical scope—ranging from fixed-price product builds to dedicated monthly engineering teams. You can submit your requirement on our **Contact** page for a transparent proposal within 24 hours.`;
  }

  if (msg.includes('contact') || msg.includes('call') || msg.includes('email') || msg.includes('talk') || msg.includes('phone')) {
    return `You can reach our team immediately via:
• **Contact Form**: Head over to our /contact page for direct consultation
• **WhatsApp**: Click the floating WhatsApp button on the bottom-right (+91 80889 62525)
• **Inquiry Turnaround**: Our team responds within 24 business hours!`;
  }

  if (msg.includes('react') || msg.includes('node') || msg.includes('python') || msg.includes('ai') || msg.includes('tech stack') || msg.includes('cloud')) {
    return `Our engineering teams specialize in modern enterprise stacks including React, Next.js, Node.js, Python, TypeScript, AWS, Docker, AI LLM integrations, and Microservices. We architect robust solutions tailored to your technical requirements.`;
  }

  // General default response
  return `Hello! I'm the Renovia Talent AI Assistant. I can help answer questions about our software development services, recruitment solutions, open careers, or connect you directly with our engineering leadership. How can I assist your business today?`;
};
