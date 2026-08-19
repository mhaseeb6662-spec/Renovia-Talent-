export const categories = [
  'All',
  'Software Development',
  'AI & Automation',
  'Technology',
  'Recruitment',
  'Career Insights',
  'Company News',
];

export const blogData = [
  {
    id: '1',
    slug: 'how-ai-is-changing-software-development',
    title: 'How AI is Changing Software Development',
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
    author: 'Sarah Jenkins',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    slug: 'future-of-remote-work-in-tech',
    title: 'The Future of Remote Work in the Tech Industry',
    excerpt: 'Is remote work here to stay? We analyze the latest trends in tech hiring and how companies are adapting to a globally distributed workforce.',
    content: `
      <p class="mb-4">The tech industry led the charge in remote work adoption during the pandemic, but as the dust settles, companies are charting diverse paths forward. While some are mandating a return to the office, a significant portion of the industry has embraced a hybrid or fully remote model.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Access to Global Talent</h3>
      <p class="mb-4">One of the primary benefits of remote work is the ability to hire the best talent, regardless of geography. This has leveled the playing field, allowing startups to compete with tech giants for top-tier engineers.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Challenges in Culture Building</h3>
      <p class="mb-4">However, remote work isn't without its challenges. Fostering a cohesive company culture and facilitating spontaneous collaboration require deliberate effort and new tooling. Virtual water coolers and periodic offsites are becoming standard practice for successful remote teams.</p>
    `,
    category: 'Recruitment',
    author: 'David Chen',
    date: 'Sep 28, 2023',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    slug: 'building-scalable-cloud-architectures',
    title: 'Building Scalable Cloud Architectures in 2024',
    excerpt: 'A comprehensive guide to designing cloud-native systems that can handle rapid growth without compromising on performance or reliability.',
    content: `
      <p class="mb-4">Scalability is no longer an afterthought; it's a fundamental requirement for modern applications. Designing architectures that can gracefully handle traffic spikes and data growth requires a solid understanding of cloud-native principles.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Microservices vs. Monoliths</h3>
      <p class="mb-4">While microservices offer undeniable benefits for scalability and team autonomy, they also introduce operational complexity. We discuss when it makes sense to break down a monolith and how to manage distributed systems effectively.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">Serverless Technologies</h3>
      <p class="mb-4">Serverless computing continues to gain traction, abstracting away infrastructure management and allowing developers to focus solely on code. We explore use cases where serverless architectures shine and where they might fall short.</p>
    `,
    category: 'Software Development',
    author: 'Alex Rodriguez',
    date: 'Nov 05, 2023',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    slug: 'renovia-talent-expands-services',
    title: 'Renovia Talent Expands Digital Transformation Services',
    excerpt: 'We are thrilled to announce the expansion of our service offerings to help more businesses navigate their digital transformation journey.',
    content: `
      <p class="mb-4">At Renovia Talent, we're constantly evolving to meet the needs of our clients. Today, we're excited to announce the expansion of our Digital Transformation practice.</p>
      <p class="mb-4">This new offering combines our deep technical expertise with strategic business consulting to help organizations modernize their operations, adopt cloud technologies, and build digital-first cultures.</p>
      <h3 class="text-xl font-bold text-white mt-8 mb-4">What This Means for Our Clients</h3>
      <p class="mb-4">Clients can now rely on Renovia Talent not just for software development and staffing, but as a strategic partner in their long-term technological evolution.</p>
    `,
    category: 'Company News',
    author: 'Management Team',
    date: 'Dec 01, 2023',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  }
];
