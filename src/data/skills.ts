export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: 'Layout',
    description: 'Crafting responsive, accessible, and high-performance interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Web Design'],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    icon: 'Server',
    description: 'Building server-side logic and interconnecting services.',
    skills: ['Node.js', 'Django', 'REST APIs'],
  },
  {
    id: 'programming',
    name: 'Programming Languages',
    icon: 'Code2',
    description: 'Core languages for systems, applications, and scripting.',
    skills: ['Python', 'Java', 'JavaScript'],
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    icon: 'Database',
    description: 'Relational data modeling, querying, and schema design.',
    skills: ['MySQL', 'PostgreSQL'],
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    icon: 'Wrench',
    description: 'Industry-standard version control and development environments.',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'cs-foundations',
    name: 'Computer Science & Methods',
    icon: 'Terminal',
    description: 'Fundamental software engineering principles and workflows.',
    skills: ['OOP', 'CRUD', 'MVC', 'Agile Methodology', 'SDLC', 'Debugging', 'Testing'],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: 'BrainCircuit',
    description: 'Classical predictive models and computer vision fundamentals.',
    skills: ['Decision Trees', 'SVM', 'Random Forest', 'Computer Vision Basics'],
  },
  {
    id: 'ai-prompting',
    name: 'AI & Prompt Engineering',
    icon: 'Sparkles',
    description: 'Modern LLM workflows and AI-accelerated software engineering.',
    skills: ['ChatGPT', 'Claude', 'Google Gemini', 'AI-assisted Software Development'],
  },
];
