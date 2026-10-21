import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { educationData } from '../data/education';

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ACADEMIC BACKGROUND"
          title="Education & Formal Qualifications"
          description="A strong academic foundation in Computer Applications and Computer Science, reflecting high analytical commitment and consistent scholastic merit."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Period & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                      edu.status === 'In Progress'
                        ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/60'
                        : 'bg-slate-800/70 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    {edu.status}
                  </span>
                </div>

                {/* Degree & Institution */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 shrink-0">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-400 light:text-slate-600">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 my-5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CGPA Badge Footer */}
              <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  {edu.cgpaLabel}
                </span>
                <span className="px-3 py-1 rounded-xl font-mono text-sm font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 shadow-sm">
                  {edu.cgpa} CGPA
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
