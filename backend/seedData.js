import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Blog from './models/Blog.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import Lead from './models/Lead.js';

dotenv.config();

const blogsSeed = [
  {
    title: 'How AI is Changing Software Development',
    slug: 'how-ai-is-changing-software-development',
    excerpt: 'Explore the profound impact of Artificial Intelligence on modern software engineering practices, from code generation to automated testing.',
    content: `
      <p class="mb-4">Artificial Intelligence is fundamentally reshaping the software development lifecycle. By automating repetitive tasks and providing intelligent code suggestions, AI tools are allowing developers to focus on higher-level architecture and problem-solving.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">The Rise of AI Assistants</h3>
      <p class="mb-4">Tools like GitHub Copilot and Tabnine have become indispensable for modern developers. These assistants don't just complete lines of code; they can generate entire functions based on natural language descriptions, significantly accelerating development velocity.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Automated Testing and QA</h3>
      <p class="mb-4">AI is also revolutionizing Quality Assurance. Machine learning algorithms can now analyze codebases to identify potential vulnerabilities, predict where bugs are most likely to occur, and even automatically generate unit tests.</p>
      <p class="mb-4">As we look to the future, the role of the software developer will continue to evolve from a "code writer" to a "system architect" who guides and collaborates with AI to build robust solutions.</p>
    `,
    category: 'AI & Automation',
    author: { name: 'Sarah Jenkins', role: 'AI Engineering Lead' },
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    tags: ['AI & Automation', 'Software Engineering', 'Future of Code'],
  },
  {
    title: 'The Future of Remote Work in the Tech Industry',
    slug: 'future-of-remote-work-in-tech',
    excerpt: 'Is remote work here to stay? We analyze the latest trends in tech hiring and how companies are adapting to a globally distributed workforce.',
    content: `
      <p class="mb-4">The tech industry led the charge in remote work adoption during the pandemic, but as the dust settles, companies are charting diverse paths forward. While some are mandating a return to the office, a significant portion of the industry has embraced a hybrid or fully remote model.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Access to Global Talent</h3>
      <p class="mb-4">One of the primary benefits of remote work is the ability to hire the best talent, regardless of geography. This has leveled the playing field, allowing startups to compete with tech giants for top-tier engineers.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Challenges in Culture Building</h3>
      <p class="mb-4">However, remote work isn't without its challenges. Fostering a cohesive company culture and facilitating spontaneous collaboration require deliberate effort and new tooling. Virtual water coolers and periodic offsites are becoming standard practice for successful remote teams.</p>
    `,
    category: 'Recruitment',
    author: { name: 'David Chen', role: 'Head of Global Talent' },
    date: 'Sep 28, 2023',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    tags: ['Recruitment', 'Remote Work', 'Culture'],
  },
  {
    title: 'Building Scalable Cloud Architectures in 2024',
    slug: 'building-scalable-cloud-architectures',
    excerpt: 'A comprehensive guide to designing cloud-native systems that can handle rapid growth without compromising on performance or reliability.',
    content: `
      <p class="mb-4">Scalability is no longer an afterthought; it's a fundamental requirement for modern applications. Designing architectures that can gracefully handle traffic spikes and data growth requires a solid understanding of cloud-native principles.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Microservices vs. Monoliths</h3>
      <p class="mb-4">While microservices offer undeniable benefits for scalability and team autonomy, they also introduce operational complexity. We discuss when it makes sense to break down a monolith and how to manage distributed systems effectively.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Serverless Technologies</h3>
      <p class="mb-4">Serverless computing continues to gain traction, abstracting away infrastructure management and allowing developers to focus solely on code. We explore use cases where serverless architectures shine and where they might fall short.</p>
    `,
    category: 'Technology',
    author: { name: 'Alex Rivera', role: 'Chief Cloud Architect' },
    date: 'Aug 15, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    tags: ['Cloud', 'Scalability', 'Microservices'],
  },
];

const jobsSeed = [
  {
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time',
    workplaceType: 'Remote',
    experienceLevel: 'Senior Level (4+ Years)',
    salaryRange: '$70,000 - $110,000 USD / Year',
    description: 'We are looking for an experienced Full Stack Developer to build robust, scalable web applications. You will work closely with our design and product teams to deliver high-quality solutions for our global enterprise clients.',
    requirements: [
      'Strong proficiency in React, TypeScript, Node.js, and Express',
      'Solid experience with MongoDB / PostgreSQL and RESTful API architecture',
      'Hands-on experience with Docker, CI/CD, and AWS cloud ecosystem',
      'Excellent problem-solving mindset and asynchronous remote communication skills'
    ],
    responsibilities: [
      'Architect and build high-performance full-stack web applications',
      'Collaborate with UI/UX engineers to implement interactive, responsive interfaces',
      'Write clean, modular, test-covered code and conduct constructive peer reviews'
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'REST APIs'],
    screeningQuestions: [
      'How many years of commercial React & Node.js experience do you have?',
      'Have you worked on large-scale distributed cloud systems?'
    ],
    isActive: true,
  },
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Hybrid / Global',
    type: 'Full-time',
    workplaceType: 'Hybrid',
    experienceLevel: 'Mid-Senior Level (3+ Years)',
    salaryRange: '$60,000 - $85,000 USD / Year',
    description: 'Join our frontend engineering guild to craft beautiful, responsive, and performant user interfaces with modern React, Tailwind CSS, and subtle animations.',
    requirements: [
      '3+ years of professional React and modern JavaScript experience',
      'Mastery of responsive design, Tailwind CSS, and component state management',
      'Experience with web animations (Framer Motion / Three.js is a plus)'
    ],
    responsibilities: [
      'Build pixel-perfect UI components from Figma design specs',
      'Optimize web performance, Core Web Vitals, and mobile responsiveness',
      'Collaborate with backend engineers to integrate RESTful API endpoints'
    ],
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3', 'Git'],
    screeningQuestions: [
      'Can you share a portfolio or GitHub link of your recent React work?'
    ],
    isActive: true,
  },
  {
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time',
    workplaceType: 'Remote',
    experienceLevel: 'Mid-Senior Level (3+ Years)',
    salaryRange: '$65,000 - $95,000 USD / Year',
    description: 'We need a Backend Developer to design, build, and maintain robust microservices, cloud APIs, and high-throughput databases.',
    requirements: [
      'Deep knowledge of Node.js, Python, or Go for backend microservices',
      'Hands-on expertise with MongoDB, PostgreSQL, and Redis caching',
      'Experience building secure, scalable RESTful & GraphQL APIs'
    ],
    responsibilities: [
      'Develop scalable server-side business logic and third-party integrations',
      'Ensure data security, RBAC authorization, and zero-downtime reliability'
    ],
    skills: ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    screeningQuestions: [
      'Describe a database query optimization you recently performed.'
    ],
    isActive: true,
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote / Global',
    type: 'Full-time',
    workplaceType: 'Remote',
    experienceLevel: 'Mid-Senior Level',
    salaryRange: '$55,000 - $80,000 USD / Year',
    description: 'We are seeking a talented UI/UX Designer to create intuitive and engaging enterprise digital experiences, wireframes, and design systems.',
    requirements: [
      'Proficiency in Figma, design systems, and rapid interactive prototyping',
      'Strong portfolio demonstrating human-centered UX design and sleek modern UI'
    ],
    responsibilities: [
      'Design wireframes, user flows, and high-fidelity production mockups',
      'Partner closely with frontend engineering to ensure pixel-perfect realization'
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'],
    screeningQuestions: [
      'Please link your Figma or Behance portfolio.'
    ],
    isActive: true,
  },
  {
    title: 'Talent Acquisition Specialist',
    department: 'Human Resources',
    location: 'Remote / Global',
    type: 'Full-time',
    workplaceType: 'Remote',
    experienceLevel: 'Mid-Level (2-4 Years)',
    salaryRange: '$45,000 - $65,000 USD / Year',
    description: 'Help us discover and recruit the top 3% engineering and tech talent globally to support our rapid international growth.',
    requirements: [
      'Proven experience in technical recruiting, sourcing engineers and designers',
      'Familiarity with ATS platforms, LinkedIn Recruiter, and candidate evaluation'
    ],
    responsibilities: [
      'Source, screen, and interview high-caliber technical candidates globally',
      'Manage end-to-end recruitment lifecycle and coordinate hiring managers'
    ],
    skills: ['Technical Recruiting', 'ATS', 'LinkedIn Recruiter', 'Candidate Screening'],
    screeningQuestions: [
      'How do you source hard-to-find senior engineering talent?'
    ],
    isActive: true,
  },
];

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting Database Seeder...');

    // 1. Seed Super Admin
    const adminEmail = 'admin@renoviatalent.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: 'Renovia Admin',
        email: adminEmail,
        password: 'Admin@123456',
        role: 'admin',
      });
      console.log('✅ Super Admin account created (admin@renoviatalent.com / Admin@123456)');
    }

    // 2. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(blogsSeed);
      console.log(`✅ Seeded ${blogsSeed.length} initial blog articles.`);
    }

    // 3. Seed Jobs
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      const createdJobs = await Job.insertMany(jobsSeed);
      console.log(`✅ Seeded ${createdJobs.length} initial job openings.`);

      // 4. Seed sample applications for ATS demonstration
      const appCount = await Application.countDocuments();
      if (appCount === 0 && createdJobs.length > 0) {
        const fullStackJob = createdJobs[0];
        await Application.create([
          {
            job: fullStackJob._id,
            jobTitle: fullStackJob.title,
            fullName: 'Michael Vance',
            email: 'michael.vance@example.com',
            phone: '+1 (555) 234-5678',
            location: 'San Francisco, CA',
            linkedin: 'https://linkedin.com/in/michael-vance',
            portfolio: 'https://michaelvance.dev',
            yearsExperience: '5 years',
            currentRole: 'Senior Full Stack Engineer',
            expectedSalary: '$95,000',
            noticePeriod: '2 Weeks',
            coverLetter: 'I have 5 years building scalable React/Node.js applications and cloud microservices.',
            resumeUrl: '/uploads/resumes/sample-resume-michael.pdf',
            resumeOriginalName: 'Michael_Vance_Senior_FullStack_Resume.pdf',
            status: 'Shortlisted',
            aiMatchScore: 92,
            aiScoreBreakdown: { technicalSkills: 95, experience: 90, roleRelevance: 92 },
            aiParsedSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker', 'GraphQL'],
            aiStrongMatches: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
            aiMissingSkills: ['Terraform'],
            aiSummary: 'Outstanding candidate with deep 5-year full-stack expertise. Strong architectural alignment for enterprise engineering.',
          },
          {
            job: fullStackJob._id,
            jobTitle: fullStackJob.title,
            fullName: 'Elena Rostova',
            email: 'elena.rostova@example.com',
            phone: '+44 20 7946 0912',
            location: 'London, UK',
            linkedin: 'https://linkedin.com/in/elena-rostova',
            yearsExperience: '3 years',
            currentRole: 'Frontend & API Developer',
            expectedSalary: '$80,000',
            noticePeriod: 'Immediate',
            coverLetter: 'Passionate software developer focusing on modern web stacks and clean UI engineering.',
            resumeUrl: '/uploads/resumes/sample-resume-elena.pdf',
            resumeOriginalName: 'Elena_Rostova_Developer_CV.pdf',
            status: 'Screening',
            aiMatchScore: 84,
            aiScoreBreakdown: { technicalSkills: 85, experience: 80, roleRelevance: 84 },
            aiParsedSkills: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'PostgreSQL'],
            aiStrongMatches: ['React', 'Node.js', 'REST APIs'],
            aiMissingSkills: ['Docker', 'AWS'],
            aiSummary: 'Solid developer with strong React capabilities and clear clean-code fundamentals. Recommended for technical phone screen.',
          },
        ]);
        console.log('✅ Seeded sample candidate applications with AI scores.');
      }
    }

    // 5. Seed sample leads for CRM
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      await Lead.create([
        {
          name: 'Arthur Sterling',
          email: 'arthur@novadynamics.io',
          phone: '+1 415 890 1234',
          company: 'Nova Dynamics Tech',
          service: 'AI & Automation Solutions',
          budget: '$25,000 - $50,000',
          message: 'We require an enterprise team to develop an autonomous AI SaaS analytics pipeline connected with our ERP database.',
          status: 'Qualified',
          aiPriority: 'High',
          aiAnalysis: 'High commercial intent identified with substantial budget allocation and clear enterprise requirements.',
        },
        {
          name: 'Clara Oswald',
          email: 'clara@oswaldmedia.co',
          phone: '+44 7700 900543',
          company: 'Oswald Media Group',
          service: 'Software Development',
          budget: '$10,000 - $20,000',
          message: 'Looking to modernize our existing web portal into a fast React + Node.js scalable platform.',
          status: 'New',
          aiPriority: 'Medium',
          aiAnalysis: 'Genuine business requirement identified. Recommended for direct sales follow-up within 24h.',
        },
      ]);
      console.log('✅ Seeded sample CRM leads with AI Priority scoring.');
    }

    console.log('🎉 Database Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  }
};
