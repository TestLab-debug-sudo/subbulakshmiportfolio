import { motion } from 'framer-motion';
import { Layers, Database, ShieldCheck, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profileData } from '../data/profile';
import { educationData } from '../data/education';

const HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
  Database: <Database className="w-5 h-5 text-teal-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-indigo-400" />,
};

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ABOUT ME"
          title="Engineering Solutions at the Intersection of Web, Data & AI"
          description="A disciplined approach to software development, grounded in strong computer science fundamentals, continuous learning, and practical engineering."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12">
          {/* Left Column: Narrative paragraphs & Academic Growth (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-xl backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
                Architecting Modern Web & Software Systems
              </h3>

              {profileData.aboutNarrative.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-sans"
                >
                  {paragraph}
                </p>
              ))}

              {/* Verified Key Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Full-Stack Development (React, JS, SQL)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>API Integration & Relational DBs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Machine Learning & Cyber Threat Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>AI Prompt Engineering (ChatGPT, Claude)</span>
                </div>
              </div>
            </div>

            {/* Academic Growth Timeline Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-900 font-bold">
                  Academic Growth Timeline
                </h4>
              </div>

              <div className="space-y-4">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-200 dark:text-slate-200 light:text-slate-800">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-slate-400">{edu.institution}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">{edu.period}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                        {edu.cgpaLabel}: {edu.cgpa}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Competency Cards (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {profileData.coreHighlights.map((hl, idx) => (
              <motion.div
                key={hl.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 hover:border-cyan-500/40 transition-all shadow-sm group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 group-hover:scale-105 transition-transform">
                    {HIGHLIGHT_ICONS[hl.icon] || <Layers className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 dark:group-hover:text-cyan-600 transition-colors">
                      {hl.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-sans">
                      {hl.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
