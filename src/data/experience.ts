export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  type: 'Internship' | 'Project Internship';
  description: string;
  responsibilities: string[];
  skills: string[];
  highlight: string;
}

export const experienceData: Experience[] = [
  {
    id: 'foxzoid-game-studio',
    role: 'Game Developer Intern',
    company: 'Foxzoid Game Studio LLP',
    location: 'Remote / Hybrid',
    period: '2026',
    badge: '3-Month Internship',
    type: 'Internship',
    description:
      'Completed a focused three-month game development internship contributing to interactive logic, asset coordination, and iterative problem-solving.',
    responsibilities: [
      'Contributed to core development tasks and game mechanic implementation.',
      'Engaged in iterative problem-solving to debug runtime game events and enhance interactive playability.',
      'Collaborated closely with mentors to deliver milestone features within sprint deadlines.',
      'Successfully fulfilled all internship requirements and earned an official Certificate of Completion.',
    ],
    skills: ['Game Development', 'Problem Solving', 'Debugging', 'Iterative Design', 'Logic Architecture'],
    highlight: 'Earned official Certificate of Completion upon successful delivery of internship milestones.',
  },
  {
    id: 'gates-cloud-technologies',
    role: 'Full Stack Developer Intern',
    company: 'Gates Cloud Technologies Pvt Ltd',
    location: 'Onsite / Hybrid',
    period: '2025–2026',
    badge: 'Featured Role',
    type: 'Internship',
    description:
      'Engineered responsive web applications and integrated database-backed services using modern web technologies and PostgreSQL.',
    responsibilities: [
      'Developed responsive, accessible user interfaces using clean semantic HTML, CSS, and modern JavaScript.',
      'Engineered backend database integrations and structured SQL queries with PostgreSQL.',
      'Conducted API integration, system testing, performance optimization, and rigorous bug fixing.',
      'Collaborated within an engineering team using Git version control and coordinated repository workflows.',
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PostgreSQL', 'API Integration', 'Testing & Debugging', 'Git'],
    highlight: 'Built scalable database-backed web features with PostgreSQL and maintained Git collaboration.',
  },
  {
    id: 'clouds-by-sunil-tecgrad',
    role: 'React.js Intern',
    company: 'CloudsBySunil × TecGrad',
    location: 'Online Learning & Project Internship',
    period: '2025',
    badge: 'Project Track',
    type: 'Project Internship',
    description:
      'Completed rigorous online internship modules focusing on modern component-driven React.js web architecture, state management, and real-world project deliverables.',
    responsibilities: [
      'Successfully completed intensive online internship curriculum and hands-on coding modules.',
      'Developed both individual feature modules and collaborative team project components.',
      'Gained deep practical experience with React hooks, component lifecycle, and responsive layouts.',
      'Cultivated active teamwork, agile communication, and code-review problem-solving skills.',
    ],
    skills: ['React.js', 'JavaScript (ES6+)', 'Component Architecture', 'Team Collaboration', 'Problem Solving'],
    highlight: 'Delivered individual and team React.js projects with clean component architecture.',
  },
];
