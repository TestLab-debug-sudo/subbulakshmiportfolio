import { motion } from 'framer-motion';
import { Trophy, Sparkles, Calendar, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { achievementsData } from '../data/achievements';

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="RECOGNITION & HONORS"
          title="Certifications & Hackathon Achievements"
          description="Competitive achievements and academic conclaves demonstrating creative problem-solving, rapid technical reasoning, and teamwork."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {achievementsData.map((item, idx) => {
            const isWinner = item.awardType === 'Winner';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className={`relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border shadow-xl backdrop-blur-sm transition-all hover:scale-[1.01] ${
                  isWinner
                    ? 'border-amber-500/50 shadow-amber-950/20'
                    : 'border-slate-800 dark:border-slate-800 light:border-slate-200'
                }`}
              >
                {/* Top Badge & Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border ${
                      isWinner
                        ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                        : 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
                    }`}
                  >
                    {isWinner ? (
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    {item.badge}
                  </span>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.year}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {item.title}
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1">
                  {item.subtitle}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Host: {item.organization}
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Verified Credential Tag */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Resume Credential</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
