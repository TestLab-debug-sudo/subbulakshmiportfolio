import { motion } from 'framer-motion';
import {
  Layout,
  Server,
  Code2,
  Database,
  Wrench,
  Terminal,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';
import { SkillCategory as SkillCategoryType } from '../data/skills';

interface SkillCategoryCardProps {
  category: SkillCategoryType;
  index: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5 text-cyan-400" />,
  Server: <Server className="w-5 h-5 text-teal-400" />,
  Code2: <Code2 className="w-5 h-5 text-emerald-400" />,
  Database: <Database className="w-5 h-5 text-blue-400" />,
  Wrench: <Wrench className="w-5 h-5 text-amber-400" />,
  Terminal: <Terminal className="w-5 h-5 text-indigo-400" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-purple-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-rose-400" />,
};

export default function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const icon = ICON_MAP[category.icon] || <Code2 className="w-5 h-5 text-cyan-400" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 hover:border-cyan-500/40 transition-all duration-200 hover:shadow-lg backdrop-blur-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            {icon}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
              {category.name}
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
              {category.description}
            </p>
          </div>
        </div>

        {/* Skill Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-800 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
