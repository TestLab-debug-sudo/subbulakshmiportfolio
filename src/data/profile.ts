export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  github: string;
  githubDisplay: string;
  portfolioUrl: string;
  location: string;
  availability: {
    status: 'available' | 'busy';
    label: string;
    note: string;
  };
  portraitImage: string;
  profileImage: string;
  heroTechBadges: string[];
  aboutNarrative: string[];
  coreHighlights: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const profileData: Profile = {
  name: 'Subbulakshmi K',
  shortName: 'Subbu',
  initials: 'SK',
  role: 'Full Stack Developer',
  eyebrow: 'FULL STACK DEVELOPER',
  headline: "Hi, I'm Subbulakshmi K.",
  tagline: 'Building thoughtful digital experiences with code, creativity, and problem-solving.',
  summary:
    'Full Stack Developer with hands-on experience in responsive web development, API integration, database technologies, machine learning projects, and AI-assisted software engineering.',
  email: 'subbulakshmi0k27@gmail.com',
  phone: '+918778584218',
  phoneDisplay: '8778584218',
  github: 'https://www.github.com/subbulakshmi0K27',
  githubDisplay: 'github.com/subbulakshmi0K27',
  portfolioUrl: 'https://www.protfoliomee.netlify.app/',
  location: 'Tamil Nadu, India',
  availability: {
    status: 'available',
    label: 'Open for Software Development Roles',
    note: 'Actively seeking Full Stack, Frontend, or Software Engineering positions',
  },
  portraitImage: '/assets/subbu-portrait.jpeg',
  profileImage: '/assets/subbu-profile.png',
  heroTechBadges: ['React.js', 'JavaScript', 'Node.js', 'Python', 'SQL'],
  aboutNarrative: [
    'I am a passionate Full Stack Developer currently pursuing my Master of Computer Applications (MCA) at Mepco Schlenk Engineering College (2024–2026) with an 8.91 CGPA, building upon my foundational B.Sc. in Computer Science from Madurai Kamaraj University (7.70 CGPA).',
    'My technical focus bridges responsive, user-centric frontend engineering with resilient backend architectures and database management. I have gained hands-on industry experience building web applications, designing RESTful APIs, and implementing relational schemas with PostgreSQL and MySQL.',
    'Beyond core web development, I am deeply intrigued by the convergence of machine learning and cybersecurity — from predictive threat detection to image-based predictive analytics. Additionally, I leverage modern AI-assisted engineering methodologies and prompt engineering to accelerate development workflows, debug systematically, and maintain high code quality.',
  ],
  coreHighlights: [
    {
      title: 'Full Stack Architecture',
      description: 'End-to-end web engineering with React, Node.js, and SQL databases, delivering responsive and robust solutions.',
      icon: 'Layers',
    },
    {
      title: 'API & Data Engineering',
      description: 'RESTful API integration, relational database design (PostgreSQL & MySQL), and systematic data handling.',
      icon: 'Database',
    },
    {
      title: 'ML & Security Projects',
      description: 'Practical exploration of cyber threat prediction and machine learning classification algorithms.',
      icon: 'ShieldCheck',
    },
    {
      title: 'AI-Assisted Workflow',
      description: 'Leveraging AI tools (ChatGPT, Claude, Gemini) and prompt engineering for rapid prototyping and rigorous debugging.',
      icon: 'Cpu',
    },
  ],
};
