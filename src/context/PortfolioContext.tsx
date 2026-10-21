import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  type PortfolioData,
} from '../data/portfolioStore';
import type { Certification, Project, SkillCategory } from '../data/portfolio';

interface PortfolioContextType {
  data: PortfolioData;
  updateProfile: (profileUpdates: Partial<PortfolioData['profile']>) => void;
  // Certifications CRUD
  addCertification: (cert: Certification) => void;
  updateCertification: (index: number, cert: Certification) => void;
  deleteCertification: (index: number) => void;
  // Projects CRUD
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Skills CRUD
  updateSkillCategories: (categories: SkillCategory[]) => void;
  // Reset
  resetToDefaults: () => void;
  // Raw update
  setRawData: (data: PortfolioData) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<PortfolioData>;
      if (custom.detail) {
        setData(custom.detail);
      }
    };
    window.addEventListener('portfolio-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-updated', handleUpdate);
  }, []);

  const updateProfile = useCallback((profileUpdates: Partial<PortfolioData['profile']>) => {
    setData((prev) => {
      const updated = {
        ...prev,
        profile: { ...prev.profile, ...profileUpdates },
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const addCertification = useCallback((cert: Certification) => {
    setData((prev) => {
      const updated = {
        ...prev,
        certifications: [cert, ...prev.certifications],
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const updateCertification = useCallback((index: number, cert: Certification) => {
    setData((prev) => {
      const newCerts = [...prev.certifications];
      newCerts[index] = cert;
      const updated = {
        ...prev,
        certifications: newCerts,
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const deleteCertification = useCallback((index: number) => {
    setData((prev) => {
      const newCerts = prev.certifications.filter((_, i) => i !== index);
      const updated = {
        ...prev,
        certifications: newCerts,
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const addProject = useCallback((project: Project) => {
    setData((prev) => {
      const updated = {
        ...prev,
        projects: [project, ...prev.projects],
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setData((prev) => {
      const newProjects = prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
      const updated = {
        ...prev,
        projects: newProjects,
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setData((prev) => {
      const newProjects = prev.projects.filter((p) => p.id !== id);
      const updated = {
        ...prev,
        projects: newProjects,
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const updateSkillCategories = useCallback((categories: SkillCategory[]) => {
    setData((prev) => {
      const updated = {
        ...prev,
        skillCategories: categories,
      };
      savePortfolioData(updated);
      return updated;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaults = resetPortfolioData();
    setData(defaults);
  }, []);

  const setRawData = useCallback((newData: PortfolioData) => {
    savePortfolioData(newData);
    setData(newData);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateProfile,
        addCertification,
        updateCertification,
        deleteCertification,
        addProject,
        updateProject,
        deleteProject,
        updateSkillCategories,
        resetToDefaults,
        setRawData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
