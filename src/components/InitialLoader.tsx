import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2 } from 'lucide-react';

interface InitialLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'kernel: mounting subbulakshmi.workspace v2.4...',
  'init: loading core modules [React, TypeScript, Python, SQL]...',
  'cache: verifying project manifests and academic credentials...',
  'network: developer terminal online (port 5173)...',
  'ready: launching user interface...',
];

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [progress, setProgress] = useState(15);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Check if user already loaded during this session
    const hasLoaded = sessionStorage.getItem('subbu_loader_shown');
    if (hasLoaded) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('subbu_loader_shown', 'true');
            onComplete();
          }, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 20) + 12;
        return next > 100 ? 100 : next;
      });
    }, 180);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 380);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        clearInterval(logTimer);
        sessionStorage.setItem('subbu_loader_shown', 'true');
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearInterval(logTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('subbu_loader_shown', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-4 font-mono select-none"
    >
      {/* Background ambient grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        {/* Header with status lights */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              workspace_boot.sh
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-slate-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded border border-slate-800 hover:border-cyan-500/40"
          >
            Skip [Esc]
          </button>
        </div>

        {/* Monogram Display */}
        <div className="flex flex-col items-center my-6">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 shadow-[0_0_30px_-5px_rgba(0,245,212,0.3)] mb-4"
          >
            <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
              SK
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full" />
          </motion.div>

          <h2 className="text-sm font-sans font-semibold tracking-wide text-slate-200">
            Subbulakshmi K
          </h2>
          <p className="text-xs text-cyan-400/90 font-mono mt-0.5">
            Full Stack Developer Workspace
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 p-0.5 border border-slate-800/80 mb-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(0,245,212,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Percentage and Terminal Log */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Loading workspace assets
          </span>
          <span className="font-mono font-bold text-cyan-400">{progress}%</span>
        </div>

        {/* Terminal Boot Log */}
        <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/60 text-[11px] text-slate-400 font-mono h-12 overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="truncate text-cyan-300/80"
            >
              <span className="text-slate-600 mr-1.5">$</span>
              {BOOT_LOGS[logIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
