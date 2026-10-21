import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Award } from 'lucide-react';
import { experienceData } from '../data/experience';

export default function ExperienceTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Central spine line for desktop */}
      <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500/80 via-slate-700 to-slate-800" />

      {/* Mobile spine line */}
      <div className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/80 via-slate-700 to-slate-800" />

      <div className="space-y-8 md:space-y-12">
        {experienceData.map((exp, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Marker Node */}
              <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,245,212,0.4)] z-10">
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Content Card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                  isEven ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'
                }`}
              >
                <div className="p-6 rounded-2xl bg-slate-900/70 dark:bg-slate-900/70 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
                  {/* Period & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    {exp.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-medium text-slate-400 dark:text-slate-400 light:text-slate-600 mb-3">
                    {exp.company}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Responsibilities list */}
                  <ul className="space-y-1.5 mb-4 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlight pill */}
                  <div className="p-2.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-[11px] text-cyan-300 dark:text-cyan-300 light:text-cyan-800 flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">{exp.highlight}</span>
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
