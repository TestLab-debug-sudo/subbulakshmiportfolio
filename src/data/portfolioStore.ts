import {
  profile as defaultProfile,
  education as defaultEducation,
  experience as defaultExperience,
  projects as defaultProjects,
  certifications as defaultCertifications,
  achievements as defaultAchievements,
  skillCategories as defaultSkillCategories,
  type Project,
  type Certification,
  type SkillCategory,
} from './portfolio';

export interface PortfolioData {
  profile: typeof defaultProfile;
  education: typeof defaultEducation;
  experience: typeof defaultExperience;
  projects: Project[];
  certifications: Certification[];
  achievements: typeof defaultAchievements;
  skillCategories: SkillCategory[];
}

const STORAGE_KEY = 'subbulakshmi_portfolio_data_v1';
const AUTH_KEY = 'subbulakshmi_admin_auth_v1';

export function getDefaultPortfolioData(): PortfolioData {
  return {
    profile: JSON.parse(JSON.stringify(defaultProfile)),
    education: JSON.parse(JSON.stringify(defaultEducation)),
    experience: JSON.parse(JSON.stringify(defaultExperience)),
    projects: JSON.parse(JSON.stringify(defaultProjects)),
    certifications: JSON.parse(JSON.stringify(defaultCertifications)),
    achievements: JSON.parse(JSON.stringify(defaultAchievements)),
    skillCategories: JSON.parse(JSON.stringify(defaultSkillCategories)),
  };
}

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultPortfolioData();
      savePortfolioData(defaults);
      return defaults;
    }
    const parsed = JSON.parse(raw);
    return {
      profile: { ...defaultProfile, ...(parsed.profile || {}) },
      education: parsed.education || defaultEducation,
      experience: parsed.experience || defaultExperience,
      projects: parsed.projects || defaultProjects,
      certifications: parsed.certifications || defaultCertifications,
      achievements: parsed.achievements || defaultAchievements,
      skillCategories: parsed.skillCategories || defaultSkillCategories,
    };
  } catch {
    return getDefaultPortfolioData();
  }
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolio-updated', { detail: data }));
  } catch (err) {
    console.error('Failed to save portfolio data to localStorage', err);
  }
}

export function resetPortfolioData(): PortfolioData {
  const defaults = getDefaultPortfolioData();
  savePortfolioData(defaults);
  return defaults;
}

// Authentication helpers
export interface AdminUser {
  email: string;
  role: string;
  token: string;
  loginAt: number;
}

export function checkAdminAuth(): boolean {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const auth: AdminUser = JSON.parse(raw);
    // 24 hour session validity
    return Boolean(auth.token && Date.now() - auth.loginAt < 24 * 60 * 60 * 1000);
  } catch {
    return false;
  }
}

export function setAdminAuth(auth: AdminUser): void {
  try {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch (e) {
    console.error(e);
  }
}

export function clearAdminAuth(): void {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error(e);
  }
}
