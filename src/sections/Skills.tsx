import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SkillCategoryCard from '../components/SkillCategory';
import { skillsData } from '../data/skills';

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = skillsData
    .map((category) => {
      if (!searchTerm.trim()) return category;
      const lower = searchTerm.toLowerCase();
      const matchedSkills = category.skills.filter((skill) =>
        skill.toLowerCase().includes(lower),
      );
      const categoryMatches =
        category.name.toLowerCase().includes(lower) ||
        category.description.toLowerCase().includes(lower);

      if (categoryMatches) return category;
      if (matchedSkills.length > 0) {
        return {
          ...category,
          skills: matchedSkills,
        };
      }
      return null;
    })
    .filter(Boolean) as typeof skillsData;

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TECHNICAL CAPABILITIES"
          title="Skills & Engineering Competencies"
          description="A structured inventory of core programming languages, modern frameworks, database engines, and AI engineering practices."
          align="center"
        />

        {/* Search Bar for Skills */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills (e.g. React, Python, SQL, Git)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs font-mono">
            No technical skills found matching "{searchTerm}".
          </div>
        )}

        {/* Bottom AI-Assisted Engineering Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-emerald-950/30 border border-cyan-800/40 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-800/80 text-cyan-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
              AI-Accelerated Engineering Approach
            </h4>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
              Combining foundational software engineering (OOP, MVC, Relational DBs) with modern prompt engineering and generative AI tools (ChatGPT, Claude, Gemini) to accelerate architecture design, rigorous unit testing, and continuous problem-solving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
