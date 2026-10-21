/**
 * Central portfolio data — generated from Subbulakshmi K's resume.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Subbulakshmi K',
  displayName: 'Subbulakshmi K',
  firstName: 'SUBBULAKSHMI',
  seriesTag: '',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'SUBBULAKSHMI PORTFOLIO',
  role: 'Full Stack Developer',
  tagline: ['Full Stack Developer', 'MCA Student', 'React & Python'],
  intro:
    'Full Stack Developer with hands-on experience building responsive web applications using React.js, Node.js, Django, and SQL databases, along with applied machine learning projects spanning healthcare diagnostics and cybersecurity. Skilled in AI-assisted software development, Prompt Engineering, and working with ChatGPT, Claude, and Google Gemini.',
  location: 'Tamil Nadu, India',
  email: 'subbulakshmi0k27@gmail.com',
  phone: '8778584218',
  links: {
    linkedin: 'https://protfoliomee.netlify.app/',
    github: 'https://github.com/subbulakshmi0K27',
    portfolio: 'https://protfoliomee.netlify.app/',
  },
  resumePdf: '/assets/Subbulakshmi_K_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Subbulakshmi K',
  },
  interests: ['AI-Assisted Software Development', 'Prompt Engineering', 'Healthcare ML Diagnostics', 'Full Stack Architecture'],
};

export const education = [
  {
    school: 'Mepco Schlenk Engineering College',
    place: 'Sivakasi, Tamil Nadu',
    degree: 'MCA (Master of Computer Applications)',
    period: '2024 – 2026',
    score: 'CGPA 8.91 (VI Semester)',
  },
  {
    school: 'Madurai Kamaraj University',
    place: 'Madurai, Tamil Nadu',
    degree: 'BSc, Computer Science',
    period: '2021 – 2024',
    score: 'CGPA 7.70',
  },
];

export const experience = [
  {
    company: 'Gates Cloud Technologies Pvt Ltd',
    role: 'Full Stack Developer Intern',
    place: 'Internship',
    period: '2025 – 2026',
    points: [
      'Developing responsive web applications using HTML, CSS, JavaScript, and PostgreSQL.',
      'Working on API integration, testing, and bug fixing using Git collaboration.',
    ],
  },
  {
    company: 'CloudsBySunil × TecGrad Learning & Project',
    role: 'React.js Intern',
    place: 'Online',
    period: '2025 – 2025',
    points: [
      'Completed live individual & team projects gaining hands-on practical web development experience.',
      'Improved teamwork, component architecture, and problem-solving skills in React.js.',
    ],
  },
  {
    company: 'Foxzoid Game Studio LLP',
    role: 'Game Developer Intern',
    place: 'Internship',
    period: '2026 – 2026',
    points: [
      'Completed a 3-month Game Developer Internship with hands-on development experience.',
      'Contributed to game projects using problem-solving and iterative development workflows.',
      'Earned a Certificate of Completion for strong performance.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  demo?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants' | 'cart' | 'eye';
};

export const projects: Project[] = [
  {
    id: 'engenix-ecommerce',
    title: 'Engenix E-Commerce',
    year: '2025',
    genre: 'Full Stack • React.js • E-Commerce',
    logline: 'A responsive modern e-commerce web platform featuring real-time product search, filtering, and interactive cart management.',
    stack: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    build: [
      'Developed a responsive e-commerce website with instant keyword search and interactive shopping cart functionality.',
      'Implemented dynamic product filtering by category and price alongside seamless user account management.',
      'Deployed live production build to Netlify with zero client-side latency and animated micro-interactions.',
    ],
    features: [
      'Instant keyword search & category/price filtering',
      'Interactive shopping cart with dynamic total recalculation',
      'User account management and order summary workflows',
      'Mobile-first responsive layout optimized across devices',
    ],
    metrics: [
      { value: '100%', label: 'responsive design' },
      { value: 'Live', label: 'production on Netlify' },
      { value: 'React', label: 'component architecture' },
      { value: '0ms', label: 'client-side routing lag' },
    ],
    demo: 'https://engenix01.netlify.app/',
    github: 'https://github.com/subbulakshmi0K27',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'anemia-prediction',
    title: 'Anemia Prediction System',
    year: '2026',
    genre: 'Healthcare AI • Machine Learning • Vision',
    logline: 'A non-invasive anemia prediction system combining conjunctiva image feature extraction and lifestyle factors, achieving 95.10% accuracy.',
    stack: ['Python', 'Decision Tree', 'SVM', 'Random Forest', 'Computer Vision Basics'],
    build: [
      'Developed a non-invasive anemia prediction system using eye conjunctiva image analysis and patient lifestyle data.',
      'Trained Decision Tree, SVM, and Random Forest machine learning models, achieving 95.10% accuracy for early clinical screening.',
      'Engineered erythrocyte color and hue feature extraction workflows combined with demographic lifestyle risk metrics.',
    ],
    features: [
      'Conjunctival color and texture feature extraction pipeline',
      'Integration of demographic and lifestyle behavioral indicators',
      'Comparative benchmarking across Decision Tree, SVM, and Random Forest',
      'Achieved 95.10% early screening prediction accuracy',
    ],
    metrics: [
      { value: '95.10%', label: 'model accuracy' },
      { value: '3 ML', label: 'Decision Tree, SVM, Random Forest' },
      { value: 'Vision', label: 'conjunctiva image analysis' },
      { value: 'Non-Invasive', label: 'lifestyle + image screening' },
    ],
    github: 'https://github.com/subbulakshmi0K27',
    palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
    motif: 'shield',
  },
  {
    id: 'cyber-breaches-detection',
    title: 'Cyber Breaches Prediction',
    year: '2026',
    genre: 'Cybersecurity • Machine Learning • Python',
    logline: 'An ML-based cyber threat detection system utilizing historical attack telemetry to predict and identify breach patterns.',
    stack: ['Python', 'Machine Learning', 'HTML5', 'CSS3', 'JavaScript'],
    build: [
      'Built a machine-learning-based cyber threat detection system using historical attack telemetry data.',
      'Improved threat prediction and anomaly response accuracy with correlation analysis of high-dimensional security datasets.',
      'Constructed an interactive web inspection dashboard displaying threat probability scores and incident logs.',
    ],
    features: [
      'Preprocessing pipeline for high-dimensional network attack datasets',
      'Feature correlation analysis to identify key breach indicators',
      'Classification models distinguishing normal vs. anomalous behavior',
      'Interactive web dashboard displaying breach probability metrics',
    ],
    metrics: [
      { value: 'ML', label: 'threat detection pipeline' },
      { value: 'Python', label: 'data processing & models' },
      { value: 'Proactive', label: 'predictive threat warning' },
      { value: 'Real-time', label: 'attack telemetry analysis' },
    ],
    github: 'https://github.com/subbulakshmi0K27',
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'shield',
  },
  {
    id: 'slaas-logging',
    title: 'Secure Logging as a Service',
    year: '2025',
    genre: 'Cloud & Security • Java • Relational DB',
    logline: 'A cloud-based secure logging architecture designed for centralized enterprise log ingestion, cryptographic audit trails, and analysis.',
    stack: ['Java', 'MySQL', 'JDBC', 'OOP', 'MVC Architecture'],
    build: [
      'Developed a cloud-based secure logging system (SLAAS) for centralized log capture, structured schema mapping, and analysis.',
      'Improved system security and scalability using Java object-oriented design and relational MySQL indexing.',
      'Implemented role-based audit verification and query optimization for high-throughput temporal log retrieval.',
    ],
    features: [
      'Centralized log ingestion with structured schema mapping',
      'Tamper-evident log storage and verification mechanism',
      'Role-based access control for administrative audit trails',
      'Optimized indexing for rapid temporal and severity-level queries',
    ],
    metrics: [
      { value: 'Java', label: 'enterprise backend' },
      { value: 'MySQL', label: 'scalable database indexing' },
      { value: 'SLAAS', label: 'cloud log service' },
      { value: 'Audit', label: 'tamper-evident preservation' },
    ],
    github: 'https://github.com/subbulakshmi0K27',
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'tenants',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'logic-architect',
    title: 'Logic Architect Award',
    org: "CodeFest'25 Hackathon",
    detail: 'Winner of 2nd Prize for outstanding problem-solving, architectural design, and algorithmic implementation.',
    laurel: '2nd Prize Winner',
  },
  {
    id: 'ai-conclave',
    title: 'AI Conclave Participant',
    org: 'Mepco Schlenk Engineering College',
    detail: 'Participated in AI Conclave "Empowering Future Engineers with AI Technologies", exploring cutting-edge AI innovations.',
    laurel: 'State AI Conclave',
  },
  {
    id: 'academic-excellence',
    title: 'MCA CGPA 8.91',
    org: 'Mepco Schlenk Engineering College',
    detail: 'Demonstrating consistent academic excellence and technical rigor throughout Master of Computer Applications.',
    laurel: 'Academic Distinction',
  },
  {
    id: 'foxzoid-game-dev',
    title: 'Game Developer Certificate',
    org: 'Foxzoid Game Studio LLP',
    detail: 'Successfully completed 3-month Game Developer Internship, receiving Certificate of Completion for strong performance.',
    laurel: 'Studio Internship',
  },
  {
    id: 'ai-prompt-engineering',
    title: 'AI & Prompt Engineering',
    org: 'ChatGPT • Claude • Google Gemini',
    detail: 'Proficient in AI-assisted software development, rapid prototyping, code refactoring, and AI-powered debugging workflows.',
    laurel: 'Modern AI Tools',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'Hackathon', name: "Logic Architect Award (2nd Prize) — CodeFest'25", link: 'https://github.com/subbulakshmi0K27' },
  { issuer: 'Mepco Schlenk', name: 'AI Conclave — Empowering Future Engineers with AI Technologies', link: 'https://github.com/subbulakshmi0K27' },
  { issuer: 'Foxzoid', name: 'Certificate of Completion — Game Developer Internship', link: 'https://github.com/subbulakshmi0K27' },
  { issuer: 'Gates Cloud', name: 'Full Stack Developer Internship Certificate', link: 'https://github.com/subbulakshmi0K27' },
  { issuer: 'TecGrad', name: 'React.js Web Development Project Internship', link: 'https://github.com/subbulakshmi0K27' },
  { issuer: 'MKU', name: 'Bachelor of Science — Computer Science Degree', link: 'https://github.com/subbulakshmi0K27' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Python, Java & JavaScript',
    skills: [
      { name: 'Python', mono: 'Py', note: 'Primary' },
      { name: 'Java', mono: 'Jv' },
      { name: 'JavaScript', mono: 'Js' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Responsive modern interfaces',
    skills: [
      { name: 'React.js', mono: 'Re', note: 'Core' },
      { name: 'HTML5', mono: 'H5' },
      { name: 'CSS3', mono: 'C3' },
      { name: 'Responsive Web Design', mono: 'Rw' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Server logic & databases',
    skills: [
      { name: 'Node.js', mono: 'No' },
      { name: 'Django', mono: 'Dj' },
      { name: 'REST APIs', mono: 'Ap' },
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'MySQL', mono: 'My' },
    ],
  },
  {
    id: 'ml_ai',
    title: 'Machine Learning & AI',
    subtitle: 'Predictive intelligence & tools',
    skills: [
      { name: 'Decision Tree', mono: 'Dt' },
      { name: 'SVM', mono: 'Sv' },
      { name: 'Random Forest', mono: 'Rf' },
      { name: 'Computer Vision Basics', mono: 'Cv' },
      { name: 'ChatGPT & Claude', mono: 'Ai' },
      { name: 'Google Gemini', mono: 'Gm' },
      { name: 'Prompt Engineering', mono: 'Pe', note: 'Advanced' },
    ],
  },
  {
    id: 'practices_tools',
    title: 'Tools & Concepts',
    subtitle: 'Engineering workflows',
    skills: [
      { name: 'Git', mono: 'Gt' },
      { name: 'GitHub', mono: 'Gh' },
      { name: 'VS Code', mono: 'Vs' },
      { name: 'OOP & MVC', mono: 'Oo' },
      { name: 'Agile Methodology', mono: 'Ag' },
      { name: 'SDLC', mono: 'Sd' },
      { name: 'Debugging & Testing', mono: 'Ts' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects, certifications or achievements on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  Python: ['Cyber Hacking Breaches Detection', 'Anemia Prediction System (95.10%)'],
  Java: ['Secure Logging as a Service (SLAAS)', 'Enterprise Logging System'],
  JavaScript: ['Engenix E-Commerce Website', 'Gates Cloud Technologies'],
  'React.js': ['Engenix E-Commerce (Live)', 'CloudsBySunil × TecGrad Intern'],
  HTML5: ['Engenix E-Commerce', 'Gates Cloud Technologies'],
  CSS3: ['Engenix E-Commerce', 'Gates Cloud Technologies'],
  'Responsive Web Design': ['Engenix E-Commerce', '3D Interactive Portfolio'],
  'Node.js': ['Full Stack Development', 'REST APIs'],
  Django: ['Backend Web Frameworks', 'API Development'],
  'REST APIs': ['Gates Cloud Technologies Intern', 'Engenix Services'],
  PostgreSQL: ['Gates Cloud Technologies Intern', 'Full Stack Applications'],
  MySQL: ['Secure Logging as a Service (SLAAS)', 'Relational Log Indexing'],
  'Decision Tree': ['Anemia Prediction System (95.10% accuracy)'],
  SVM: ['Anemia Prediction System (95.10% accuracy)'],
  'Random Forest': ['Anemia Prediction System (95.10% accuracy)'],
  'Computer Vision Basics': ['Eye Conjunctiva Image Analysis'],
  'ChatGPT & Claude': ['AI-Assisted Software Development & Workflow'],
  'Google Gemini': ['AI-Assisted Debugging & Code Generation'],
  'Prompt Engineering': ['AI Conclave', 'AI-Driven Development Workflows'],
  Git: ['Gates Cloud Technologies', 'Version Control Collaboration'],
  GitHub: ['github.com/subbulakshmi0K27', 'CodeFest Hackathon'],
  'VS Code': ['Primary IDE for Full Stack & ML Projects'],
  'OOP & MVC': ['SLAAS Architecture', 'Django Web Apps'],
  'Agile Methodology': ['Iterative Development at Foxzoid & Gates Cloud'],
  SDLC: ['End-to-End Project Lifecycles'],
  'Debugging & Testing': ['Gates Cloud Technologies', 'API Quality Assurance'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#051b2c', via: '#03415c', to: '#050b14', accent: '#00f2fe' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: '2021 – 2024',
    synopsis: 'Undergraduate years at Madurai Kamaraj University — Bachelor of Science in Computer Science with a strong 7.70 CGPA.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The CS Graduate',
        description: 'BSc Computer Science at Madurai Kamaraj University — mastering algorithms, data structures, and software principles with a CGPA of 7.70.',
        tags: ['BSc CS', 'Madurai Kamaraj University', 'CGPA 7.70'],
        runtime: '2021 – 2024',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'The Core Stack',
        description: 'Building deep foundations across Python, Java, JavaScript, and relational database systems.',
        tags: ['Python', 'Java', 'SQL', 'Algorithms'],
        runtime: 'Foundation Era',
        palette: ocean,
      },
    ],
  },
  {
    number: 2,
    title: 'Master of Computer Applications',
    period: '2024 – 2026',
    synopsis: 'Pursuing MCA at Mepco Schlenk Engineering College with an outstanding academic record of 8.91 CGPA.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The MCA Scholar',
        description: 'Master of Computer Applications at prestigious Mepco Schlenk Engineering College — maintaining an 8.91 CGPA.',
        tags: ['MCA', 'Mepco Schlenk', 'CGPA 8.91'],
        runtime: '2024 – 2026',
        palette: violet,
      },
      {
        code: 'S02 E02',
        title: 'The Logic Architect',
        description: 'Won 2nd Prize — Logic Architect Award at CodeFest\'25 Hackathon for exceptional solution architecture and algorithmic implementation.',
        tags: ['CodeFest\'25', '2nd Prize', 'Logic Architect'],
        runtime: 'Hackathon Win',
        palette: crimson,
      },
      {
        code: 'S02 E03',
        title: 'AI Conclave',
        description: 'Participated in State-level AI Conclave "Empowering Future Engineers with AI Technologies" at Mepco Schlenk Engineering College.',
        tags: ['AI Conclave', 'Future Engineers', 'AI Tech'],
        runtime: 'Symposium',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'Industry Experience',
    period: '2025 – 2026',
    synopsis: 'Three industry internships spanning Full Stack web development, React.js projects, and Game engineering.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Gates Cloud Technologies',
        description: 'Full Stack Developer Intern — developing responsive web applications using HTML, CSS, JavaScript, and PostgreSQL with API integration and testing.',
        tags: ['Gates Cloud', 'PostgreSQL', 'Full Stack'],
        runtime: '2025 – 2026',
        palette: ocean,
      },
      {
        code: 'S03 E02',
        title: 'React.js Project Intern',
        description: 'CloudsBySunil × TecGrad Learning & Project Intern — completed live individual & team projects with modern React.',
        tags: ['React.js', 'TecGrad', 'Team Projects'],
        runtime: '2025',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'Foxzoid Game Studio',
        description: 'Game Developer Intern — completed a 3-month Game Developer Internship, contributing to game engineering and earning a Certificate of Completion.',
        tags: ['Foxzoid', 'Game Dev', 'Certificate'],
        runtime: '2026',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'Original Productions',
    period: '2025 – 2026',
    synopsis: 'Four flagship projects: Engenix E-Commerce live on Netlify, 95.10% accurate Anemia Prediction, Cyber Breach Detection, and SLAAS Secure Logging.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'Engenix E-Commerce',
        description: 'Responsive e-commerce platform built with React.js featuring real-time product search, filtering, and cart management — live on Netlify.',
        tags: ['React.js', 'Netlify', 'Live Demo'],
        runtime: '2025',
        palette: amber,
      },
      {
        code: 'S04 E02',
        title: 'Anemia Prediction (95.10%)',
        description: 'Non-invasive anemia screening combining conjunctiva image feature extraction with Decision Tree, SVM, and Random Forest models.',
        tags: ['Machine Learning', 'Computer Vision', '95.10% Accuracy'],
        runtime: '2026',
        palette: jade,
      },
      {
        code: 'S04 E03',
        title: 'Cyber Breaches & SLAAS',
        description: 'ML-based Cyber Threat Detection System & Cloud-based Secure Logging as a Service (SLAAS) in Java & MySQL.',
        tags: ['Cybersecurity', 'Java', 'MySQL'],
        runtime: '2025 – 2026',
        palette: crimson,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'Deploying AI-assisted development and building scalable full stack solutions.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'AI-Assisted Engineering',
        description: 'Combining prompt engineering with modern full stack development using ChatGPT, Claude, and Google Gemini to build state-of-the-art products.',
        tags: ['AI-Assisted Dev', 'Prompt Engineering', 'Full Stack'],
        runtime: 'In Production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Hackathon Award', title: 'Logic Architect', detail: "Winner — 2nd Prize at CodeFest'25", palette: crimson },
  { label: 'Academic Distinction', title: '8.91 CGPA', detail: 'MCA at Mepco Schlenk Engineering College', palette: violet },
  { label: 'Live Production', title: 'Engenix Store', detail: 'React.js E-Commerce live on Netlify', palette: amber },
  { label: 'AI Accuracy', title: '95.10%', detail: 'Anemia Prediction using ML & Conjunctiva Vision', palette: jade },
  { label: 'Industry Role', title: 'Gates Cloud', detail: 'Full Stack Developer Intern (PostgreSQL & JS)', palette: ocean },
  { label: 'Enterprise Cloud', title: 'SLAAS System', detail: 'Secure Logging as a Service with Java & MySQL', palette: violet },
  { label: 'Cybersecurity', title: 'Breach Predictor', detail: 'ML Cyber Threat Telemetry Detection System', palette: crimson },
  { label: 'Studio Experience', title: 'Foxzoid Studio', detail: '3-Month Game Developer Internship & Certificate', palette: jade },
  { label: 'Frontend Stack', title: 'React.js Intern', detail: 'TecGrad Learning & Project live team build', palette: amber },
  { label: 'Next-Gen Dev', title: 'Prompt & AI', detail: 'ChatGPT, Claude & Google Gemini Workflows', palette: ocean },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'MCA · 8.91 CGPA',
    lines: ['Mepco Schlenk Engineering College (2024–2026)', 'BSc Computer Science · Madurai Kamaraj University (CGPA 7.70)'],
    chips: ['CGPA 8.91', 'MCA', 'BSc CS'],
  },
  {
    kicker: 'Tech Stack',
    title: 'React.js & Python',
    lines: ['JavaScript, Java · Node.js, Django · REST APIs', 'PostgreSQL, MySQL · HTML5, CSS3, Responsive Design'],
    chips: ['React.js', 'Python', 'Java', 'Node.js', 'Django', 'PostgreSQL'],
  },
  {
    kicker: 'Experience',
    title: 'Three Internships',
    lines: [
      'Gates Cloud Technologies Pvt Ltd — Full Stack Developer Intern',
      'CloudsBySunil × TecGrad — React.js Project Intern',
      'Foxzoid Game Studio LLP — Game Developer Intern',
    ],
    chips: ['Full Stack', 'React', 'Game Dev'],
  },
  {
    kicker: 'Flagship Projects',
    title: 'Four Originals',
    lines: [
      'Engenix E-Commerce — Responsive online store live on Netlify',
      'Anemia Prediction — 95.10% accuracy using Eye Conjunctiva Vision & ML',
      'Cyber Breaches Detection — ML-based attack prediction system',
      'SLAAS — Cloud-based Secure Logging as a Service in Java & MySQL',
    ],
  },
  {
    kicker: 'Honors',
    title: 'Hackathon & AI Conclave',
    lines: [
      "Logic Architect Award (2nd Prize) — CodeFest'25 Hackathon",
      'AI Conclave: Empowering Future Engineers with AI Technologies',
      'Game Developer Certificate of Completion — Foxzoid Game Studio',
    ],
  },
  {
    kicker: 'Next-Gen Workflow',
    title: 'AI & Prompt Engineering',
    lines: [
      'Skilled in AI-assisted software development, code generation and debugging',
      'ChatGPT · Claude · Google Gemini workflows',
    ],
  },
];

export type ProfileId = 'subbulakshmi' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'subbulakshmi',
    name: 'Subbulakshmi',
    blurb: 'The full portfolio, in order',
    color: '#00f2fe',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & Experience', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • 2025–2026`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
