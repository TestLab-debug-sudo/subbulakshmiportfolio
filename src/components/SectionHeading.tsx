import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badgeIcon?: React.ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  badgeIcon,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide border mb-3.5 ${
          isCenter ? 'mx-auto' : ''
        } bg-cyan-950/40 text-cyan-400 border-cyan-800/50 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800/50 light:bg-cyan-50 light:text-cyan-700 light:border-cyan-200`}
      >
        {badgeIcon && <span className="w-3.5 h-3.5 flex items-center justify-center">{badgeIcon}</span>}
        <span>{eyebrow}</span>
      </motion.div>

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900"
      >
        {title}
      </motion.h2>

      {/* Optional description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-3.5 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-sans"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
