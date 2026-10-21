export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  cgpaLabel: string;
  status: 'In Progress' | 'Completed';
  highlights: string[];
}

export const educationData: Education[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Mepco Schlenk Engineering College',
    period: '2024–2026',
    cgpa: '8.91',
    cgpaLabel: 'Current CGPA',
    status: 'In Progress',
    highlights: [
      'Advanced computer applications curriculum focusing on full-stack web development and software architecture.',
      'Active participation in hackathons, technology conclaves, and applied machine learning research projects.',
      'Maintained a stellar academic record with an 8.91 CGPA.',
    ],
  },
  {
    id: 'bsc',
    degree: 'B.Sc. Computer Science',
    institution: 'Madurai Kamaraj University',
    period: '2021–2024',
    cgpa: '7.70',
    cgpaLabel: 'Final CGPA',
    status: 'Completed',
    highlights: [
      'Core foundation in computer science, object-oriented programming, database management systems, and algorithms.',
      'Completed academic projects and practical lab coursework in software development and database design.',
      'Graduated with an overall CGPA of 7.70.',
    ],
  },
];
