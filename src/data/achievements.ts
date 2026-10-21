export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  category: 'Award' | 'Conclave';
  awardType: 'Winner' | 'Participant';
  description: string;
  badge: string;
  icon: string;
  year: string;
}

export const achievementsData: Achievement[] = [
  {
    id: 'codefest-logic-architect',
    title: 'Logic Architect Award — Second Prize',
    subtitle: "CodeFest '25 Hackathon",
    organization: 'CodeFest',
    category: 'Award',
    awardType: 'Winner',
    description:
      'Awarded Second Prize and recognized as Logic Architect at the CodeFest \'25 Hackathon for outstanding algorithmic reasoning, rapid problem decomposition, and robust technical execution.',
    badge: '2nd Prize Winner',
    icon: 'Trophy',
    year: '2025',
  },
  {
    id: 'ai-conclave-mepco',
    title: 'AI Conclave Participant',
    subtitle: 'Empowering Future Engineers with AI Technologies',
    organization: 'Mepco Schlenk Engineering College',
    category: 'Conclave',
    awardType: 'Participant',
    description:
      'Participated in the specialized technical conclave exploring next-generation artificial intelligence paradigms, applied machine learning systems, and industrial AI integration.',
    badge: 'Delegate',
    icon: 'Sparkles',
    year: '2024–2025',
  },
];
