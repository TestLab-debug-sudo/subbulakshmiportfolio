import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border text-slate-400 hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400 ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80'
          : 'bg-white border-slate-200 hover:border-cyan-500/40 hover:bg-slate-50 text-slate-600'
      } ${className}`}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
