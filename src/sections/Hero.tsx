import { motion } from 'framer-motion';
import { ArrowDown, FileText, Send, Sparkles, Terminal, Code2, Database, Layers } from 'lucide-react';
import { profileData } from '../data/profile';

interface HeroProps {
  onResumeClick: () => void;
  onOpenTerminal: () => void;
  onExploreWork: () => void;
  onConnectClick: () => void;
}

export default function Hero({
  onResumeClick,
  onOpenTerminal,
  onExploreWork,
  onConnectClick,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-teal-500/10 dark:bg-teal-500/10 light:bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Indicator & Role Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
                {profileData.eyebrow}
              </div>

              {/* Verified Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{profileData.availability.label}</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 leading-[1.1]"
            >
              {profileData.headline}
            </motion.h1>

            {/* Supporting Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent leading-snug"
            >
              "{profileData.tagline}"
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl leading-relaxed"
            >
              {profileData.summary}
            </motion.p>

            {/* Technology Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="pt-2 flex flex-wrap items-center gap-2"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                Core Stack:
              </span>
              {profileData.heroTechBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA */}
              <button
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer group"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onResumeClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-700 dark:border-slate-700 light:border-slate-300 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              {/* Text Link */}
              <button
                onClick={onConnectClick}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-cyan-400 underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-400 transition-colors cursor-pointer ml-1"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Let's Connect</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Developer Profile Visual & HUD (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/40 via-teal-500/20 to-emerald-500/30 rounded-3xl blur-xl opacity-75" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 p-4 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Developer HUD Window Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] font-mono text-slate-400 font-medium">
                      subbu_workspace.tsx
                    </span>
                  </div>
                  <button
                    onClick={onOpenTerminal}
                    className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    title="Launch Terminal"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Run CLI</span>
                  </button>
                </div>

                {/* Portrait Photo Container with Tech Overlays */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 group">
                  <img
                    src={profileData.portraitImage}
                    alt="Subbulakshmi K - Full Stack Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to profileImage if portraitImage has loading difficulty
                      (e.target as HTMLImageElement).src = profileData.profileImage;
                    }}
                  />

                  {/* Gradient bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                  {/* Floating Telemetry Badge 1: Education */}
                  <motion.div
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md shadow-lg"
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Education</div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>MCA</span>
                      <span className="text-emerald-400 font-mono text-[11px]">(8.91 CGPA)</span>
                    </div>
                  </motion.div>

                  {/* Floating Telemetry Badge 2: Award */}
                  <motion.div
                    initial={{ x: 15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-800/60 backdrop-blur-md shadow-lg"
                  >
                    <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Hackathon Winner
                    </div>
                    <div className="text-[11px] font-bold text-slate-200">
                      Logic Architect '25
                    </div>
                  </motion.div>

                  {/* Overlay Bottom Identity & Stack */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 border border-slate-800/80 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Subbulakshmi K</div>
                        <div className="text-[10px] font-mono text-cyan-400">
                          Full Stack • React • Python • Java
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-card interactive status */}
                <div className="mt-3 pt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Database className="w-3.5 h-3.5 text-teal-400" />
                    PostgreSQL / MySQL
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    REST APIs & ML
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
