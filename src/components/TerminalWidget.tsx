import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, RotateCcw, CornerDownLeft, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { skillsData } from '../data/skills';
import { educationData } from '../data/education';

interface TerminalWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: () => void;
  onNavigateSection?: (id: string) => void;
}

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
}

export default function TerminalWidget({
  isOpen,
  onClose,
  onToggleTheme,
  onNavigateSection,
}: TerminalWidgetProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'welcome',
      command: 'welcome',
      response: (
        <div className="text-slate-300 space-y-1">
          <p className="text-cyan-400 font-semibold">
            Subbulakshmi K — Interactive Developer Workspace Shell v2.4
          </p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-bold">help</span> to view available commands, or click any suggestion chip below.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    const parts = lower.split(' ');
    const cmd = parts[0];

    let res: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        res = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-medium">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div><span className="text-emerald-400 font-bold">about</span> : Candidate background & MCA stats</div>
              <div><span className="text-emerald-400 font-bold">skills</span> : Frontend, backend, ML & tools</div>
              <div><span className="text-emerald-400 font-bold">projects</span> : SLAAS, Cyber ML, Engenix, Anemia</div>
              <div><span className="text-emerald-400 font-bold">experience</span> : Internships (Gates, Foxzoid, TecGrad)</div>
              <div><span className="text-emerald-400 font-bold">education</span> : MCA (8.91 CGPA) & B.Sc (7.70)</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Email, phone, GitHub, portfolio</div>
              <div><span className="text-emerald-400 font-bold">theme</span> : Switch dark / light mode</div>
              <div><span className="text-emerald-400 font-bold">goto [section]</span> : Scroll to section on page</div>
              <div><span className="text-emerald-400 font-bold">clear</span> : Clear terminal output</div>
              <div><span className="text-emerald-400 font-bold">exit</span> : Close terminal window</div>
            </div>
          </div>
        );
        break;

      case 'about':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-cyan-300 font-bold">{profileData.name} — {profileData.role}</p>
            <p>{profileData.tagline}</p>
            <p className="text-slate-400">{profileData.summary}</p>
            <p className="text-emerald-400">Education: MCA @ Mepco Schlenk (CGPA: 8.91) | B.Sc CS @ MKU (CGPA: 7.70)</p>
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold">Core Technical Skills:</p>
            <div className="space-y-1 text-slate-300">
              {skillsData.map((cat) => (
                <div key={cat.id}>
                  <span className="text-slate-400 font-semibold">{cat.name}:</span>{' '}
                  <span className="text-slate-200">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold">Featured Projects:</p>
            {projectsData.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-cyan-500/40 pl-2 py-0.5">
                <span className="text-emerald-400 font-bold">[{idx + 1}] {p.name}</span>
                <span className="text-slate-400 ml-2">({p.category})</span>
                <p className="text-slate-300 text-[11px]">{p.description}</p>
                <p className="text-slate-400 text-[11px]">Stack: {p.technologies.join(', ')}</p>
                {p.liveDemo && (
                  <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                    Live Demo: {p.liveDemo}
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        res = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold">Industry Experience & Internships:</p>
            {experienceData.map((exp) => (
              <div key={exp.id} className="border-l-2 border-slate-700 pl-2">
                <div className="text-slate-200 font-semibold">
                  {exp.role} <span className="text-cyan-400">@ {exp.company}</span> ({exp.period})
                </div>
                <p className="text-slate-400 text-[11px]">{exp.highlight}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        res = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold">Academic Qualifications:</p>
            {educationData.map((edu) => (
              <div key={edu.id} className="border-l-2 border-teal-500/40 pl-2">
                <div className="text-slate-200 font-semibold">{edu.degree}</div>
                <div className="text-slate-400">{edu.institution} ({edu.period})</div>
                <div className="text-emerald-400 font-mono font-bold">{edu.cgpaLabel}: {edu.cgpa}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-cyan-300 font-bold">Contact Channels:</p>
            <p>Email: <a href={`mailto:${profileData.email}`} className="text-cyan-400 underline">{profileData.email}</a></p>
            <p>Phone: <a href={`tel:${profileData.phone}`} className="text-cyan-400 underline">{profileData.phoneDisplay}</a></p>
            <p>GitHub: <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{profileData.githubDisplay}</a></p>
            <p>Portfolio: <a href={profileData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{profileData.portfolioUrl}</a></p>
          </div>
        );
        break;

      case 'theme':
        if (onToggleTheme) {
          onToggleTheme();
          res = <p className="text-emerald-400 text-xs">Switched theme mode successfully.</p>;
        } else {
          res = <p className="text-slate-400 text-xs">Theme switcher triggered.</p>;
        }
        break;

      case 'goto': {
        const target = parts[1];
        if (target && onNavigateSection) {
          onNavigateSection(target);
          res = <p className="text-emerald-400 text-xs">Navigating to #{target}...</p>;
        } else {
          res = <p className="text-amber-400 text-xs">Usage: goto [about|experience|projects|skills|education|contact]</p>;
        }
        break;
      }

      case 'clear':
      case 'cls':
        setOutputs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'close':
      case 'quit':
        onClose();
        return;

      case 'sudo':
        res = <p className="text-rose-400 text-xs">Permission denied: Subbulakshmi K has full root administrative access.</p>;
        break;

      default:
        res = (
          <div className="text-xs text-rose-400">
            Command not recognized: <span className="font-bold text-slate-200">"{rawCmd}"</span>.
            Type <span className="text-cyan-400 font-bold">help</span> to view all commands.
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        response: res,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx] || '');
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className={`fixed z-50 shadow-2xl font-mono text-sm border rounded-2xl overflow-hidden flex flex-col backdrop-blur-xl ${
          isExpanded
            ? 'inset-4 sm:inset-10 bg-slate-950/95 border-cyan-500/30'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[min(94vw,560px)] h-[440px] bg-slate-950/95 border-slate-800'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
            <span
              className="w-3 h-3 rounded-full bg-amber-500 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
            <span
              className="w-3 h-3 rounded-full bg-emerald-500 cursor-pointer"
              onClick={() => handleCommand('help')}
            />
            <div className="flex items-center gap-1.5 ml-2 text-xs font-semibold text-slate-300 font-sans">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>subbulakshmi@workspace: ~</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <button
              onClick={() => setOutputs([])}
              className="p-1 hover:text-cyan-400 rounded transition-colors"
              title="Clear terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-cyan-400 rounded transition-colors"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-rose-400 rounded transition-colors"
              title="Close terminal [Esc]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {outputs.map((out) => (
            <div key={out.id} className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-cyan-400">subbu@workspace</span>
                <span className="text-slate-600">:</span>
                <span className="text-emerald-400">~</span>
                <span className="text-slate-500">$</span>
                <span className="text-slate-100 font-semibold">{out.command}</span>
              </div>
              <div className="pl-4">{out.response}</div>
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="text-cyan-400">subbu@workspace</span>
            <span className="text-slate-600">:</span>
            <span className="text-emerald-400">~</span>
            <span className="text-slate-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-xs focus:ring-0"
              placeholder="type help, about, skills, projects..."
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-slate-500 hover:text-cyan-400"
            >
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Quick:
          </span>
          {['help', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'clear'].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700/60 transition-colors shrink-0"
              >
                {cmd}
              </button>
            ),
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
