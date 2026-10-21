import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projectsData, Project } from '../data/projects';

const CATEGORIES = ['All', 'Full Stack', 'Machine Learning', 'Cloud & Security'] as const;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PROJECT SHOWCASE"
          title="Featured Software & Applied Research Projects"
          description="A curated portfolio of production-ready web platforms, secure cloud logging systems, and applied machine learning models."
          align="center"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project as any}
              onOpen={() => setActiveProject(project)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject as any}
          onClose={() => setActiveProject(null)}
          onSwitch={() => {}}
        />
      )}
    </section>
  );
}
