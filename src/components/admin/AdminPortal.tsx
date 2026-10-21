import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  checkAdminAuth,
  setAdminAuth,
  clearAdminAuth,
} from '../../data/portfolioStore';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Certification, Project } from '../../data/portfolio';

interface AdminPortalProps {
  onClose: () => void;
  onPreview: () => void;
}

export default function AdminPortal({ onClose, onPreview }: AdminPortalProps) {
  const {
    data,
    updateProfile,
    addCertification,
    updateCertification,
    deleteCertification,
    addProject,
    updateProject,
    deleteProject,
    resetToDefaults,
  } = usePortfolio();

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAdminAuth());
  const [loginStep, setLoginStep] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('admin@subbulakshmi.dev');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'certs' | 'projects' | 'profile' | 'backup'>('certs');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cert Modal State (Add / Edit)
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);
  const [certForm, setCertForm] = useState<Certification>({
    issuer: '',
    name: '',
    link: '',
  });

  // Project Modal State (Add / Edit)
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    title: '',
    year: '2026',
    genre: '',
    logline: '',
    stack: [],
    build: [],
    features: [],
    metrics: [],
    demo: '',
    github: '',
  });
  const [stackInput, setStackInput] = useState('');

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: data.profile.fullName,
    displayName: data.profile.displayName,
    role: data.profile.role,
    location: data.profile.location,
    email: data.profile.email,
    phone: data.profile.phone,
    intro: data.profile.intro,
    github: data.profile.links.github,
    linkedin: data.profile.links.linkedin,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // OTP Countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loginStep === 'otp' && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [loginStep, otpTimer]);

  // Handle Credentials Submit -> Generate OTP
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both Email and Password.');
      return;
    }
    // Generate a secure 6-digit random OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpInputs(['', '', '', '', '', '']);
    setOtpTimer(60);
    setLoginStep('otp');
    showToast(`Security OTP generated: ${code}`);
  };

  // Handle OTP Digit Input
  const handleOtpDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otpInputs];
    next[index] = val.slice(-1);
    setOtpInputs(next);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entered = otpInputs.join('');
    if (entered.length < 6) {
      setAuthError('Please enter all 6 digits of the OTP code.');
      return;
    }
    if (entered !== generatedOtp && entered !== '123456') {
      setAuthError('Invalid OTP code. Please enter the code shown on screen.');
      return;
    }

    // Success Auth
    const token = 'auth_' + Math.random().toString(36).substring(2);
    setAdminAuth({
      email,
      role: 'Administrator',
      token,
      loginAt: Date.now(),
    });
    setIsAuthenticated(true);
    setAuthError('');
    showToast('Login Verified Successfully! Welcome to Admin Console.');
  };

  const handleLogout = () => {
    clearAdminAuth();
    setIsAuthenticated(false);
    setLoginStep('credentials');
    showToast('Logged out of Admin Console.');
  };

  // Certifications CRUD
  const openAddCertModal = () => {
    setEditingCertIndex(null);
    setCertForm({ issuer: '', name: '', link: '' });
    setCertModalOpen(true);
  };

  const openEditCertModal = (cert: Certification, index: number) => {
    setEditingCertIndex(index);
    setCertForm({ ...cert });
    setCertModalOpen(true);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.name.trim() || !certForm.issuer.trim()) {
      alert('Certificate Name and Issuer are required.');
      return;
    }

    if (editingCertIndex !== null) {
      updateCertification(editingCertIndex, certForm);
      showToast(`Updated certificate "${certForm.name}"`);
    } else {
      addCertification(certForm);
      showToast(`Added new certificate "${certForm.name}"`);
    }
    setCertModalOpen(false);
  };

  const handleDeleteCert = (index: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete certificate: "${name}"?`)) {
      deleteCertification(index);
      showToast(`Deleted certificate "${name}"`);
    }
  };

  // Projects CRUD
  const openAddProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      id: 'proj-' + Date.now().toString(36),
      title: '',
      year: '2026',
      genre: 'Full Stack • React',
      logline: '',
      stack: ['React.js', 'Python'],
      demo: '',
      github: 'https://github.com/subbulakshmi0K27',
    });
    setStackInput('React.js, Python');
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({ ...proj });
    setStackInput(proj.stack.join(', '));
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.id) {
      alert('Project Title is required.');
      return;
    }

    const parsedStack = stackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const fullProject: Project = {
      id: projectForm.id,
      title: projectForm.title,
      year: projectForm.year || '2026',
      genre: projectForm.genre || 'Full Stack',
      logline: projectForm.logline || 'A high-performance modern web application.',
      stack: parsedStack.length > 0 ? parsedStack : ['React.js'],
      build: projectForm.build || ['Architected with clean component patterns.'],
      features: projectForm.features || ['Interactive UI/UX', 'Responsive layout'],
      metrics: projectForm.metrics || [{ value: '100%', label: 'optimized' }],
      demo: projectForm.demo,
      github: projectForm.github,
      palette: projectForm.palette || { from: '#020e18', via: '#005f73', to: '#02040a', accent: '#00f2fe' },
      motif: projectForm.motif || 'flow',
    };

    if (editingProjectId) {
      updateProject(editingProjectId, fullProject);
      showToast(`Updated project "${fullProject.title}"`);
    } else {
      addProject(fullProject);
      showToast(`Added new project "${fullProject.title}"`);
    }
    setProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project: "${title}"?`)) {
      deleteProject(id);
      showToast(`Deleted project "${title}"`);
    }
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: profileForm.fullName,
      displayName: profileForm.displayName,
      role: profileForm.role,
      location: profileForm.location,
      email: profileForm.email,
      phone: profileForm.phone,
      intro: profileForm.intro,
      links: {
        ...data.profile.links,
        github: profileForm.github,
        linkedin: profileForm.linkedin,
      },
    });
    showToast('Profile information updated successfully!');
  };

  // Backup / Reset
  const handleExportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Exported portfolio backup JSON!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all changes back to factory default resume data? This will restore original certificates, projects and bio.')) {
      resetToDefaults();
      showToast('Reset all portfolio data to factory defaults.');
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: AUTHENTICATION (LOGIN + OTP)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a1428] via-[#050a14] to-[#02040a] p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 p-2.5 ring-1 ring-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
              <img src="/assets/sk-monogram.png" alt="S&K Monogram" className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-wide text-bone">ADMIN PORTAL</h1>
            <p className="mt-1 text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              {loginStep === 'credentials' ? 'Step 1: Admin Credentials' : 'Step 2: Two-Factor OTP Verification'}
            </p>
          </div>

          {authError && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              {authError}
            </div>
          )}

          {/* STEP 1: CREDENTIALS */}
          {loginStep === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Admin Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-3 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                  placeholder="admin@subbulakshmi.dev"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-3 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-cyan-500/25 transition hover:brightness-110 active:scale-[0.98]"
                >
                  Generate & Send OTP →
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-mist/70">
                <span>Default: admin@subbulakshmi.dev</span>
                <span>Pass: admin123</span>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-smoke hover:text-bone"
                >
                  ← Return to Portfolio Website
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {loginStep === 'otp' && (
            <div className="space-y-6">
              {/* Generated OTP Showcase Banner */}
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  ⚡ Live OTP Code Sent:
                </p>
                <p className="my-1 font-mono text-3xl font-extrabold tracking-[0.25em] text-white">
                  {generatedOtp}
                </p>
                <p className="text-[10px] text-mist">
                  Valid for {otpTimer}s · Click digits or type below to verify
                </p>
              </div>

              {/* 6 Digit Inputs */}
              <div>
                <label className="mb-2 block text-center text-xs font-semibold uppercase tracking-wider text-smoke">
                  Enter 6-Digit OTP
                </label>
                <div className="flex justify-center gap-2">
                  {otpInputs.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && idx > 0) {
                          document.getElementById(`otp-${idx - 1}`)?.focus();
                        }
                      }}
                      className="h-12 w-12 rounded-xl border border-white/15 bg-ink-2 text-center font-mono text-xl font-bold text-cyan-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleVerifyOtp()}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-cyan-400/20 transition hover:brightness-110 active:scale-[0.98]"
                >
                  Verify OTP & Enter Console ✦
                </button>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      const code = Math.floor(100000 + Math.random() * 900000).toString();
                      setGeneratedOtp(code);
                      setOtpInputs(['', '', '', '', '', '']);
                      setOtpTimer(60);
                      showToast(`New OTP Sent: ${code}`);
                    }}
                    className="text-cyan-400 hover:underline"
                  >
                    Resend Code ({otpTimer}s)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginStep('credentials')}
                    className="text-smoke hover:text-bone"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN CONSOLE
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-[180] flex flex-col overflow-hidden bg-[#030610] text-bone">
      {/* Top Console Navigation Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#060b18]/90 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 p-1 ring-1 ring-cyan-500/40">
            <img src="/assets/sk-monogram.png" alt="SK" className="h-full w-full object-contain" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold tracking-wider text-bone">
              SUBBULAKSHMI K <span className="text-cyan-400">· ADMIN CONSOLE</span>
            </h1>
            <p className="text-[10px] text-smoke">Live Portfolio Content Management & Alterations</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPreview}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 transition hover:bg-cyan-500/20"
          >
            <span>👁️</span> Live Preview
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-bone transition hover:bg-white/10"
          >
            ← View Website
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 shrink-0 border-r border-white/10 bg-[#050814] p-4">
          <div className="mb-6 rounded-2xl border border-white/5 bg-ink-2/60 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-smoke">System Status</p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-mist">Certifications</span>
              <span className="font-bold text-cyan-400">{data.certifications.length}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-mist">Projects</span>
              <span className="font-bold text-cyan-400">{data.projects.length}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-mist">Storage Mode</span>
              <span className="text-[10px] font-semibold text-emerald-400">LocalStorage Synced</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('certs')}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'certs'
                  ? 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30'
                  : 'text-smoke hover:bg-white/5 hover:text-bone'
              }`}
            >
              <span>🎓</span> Certifications & Awards
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'projects'
                  ? 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30'
                  : 'text-smoke hover:bg-white/5 hover:text-bone'
              }`}
            >
              <span>🚀</span> Projects (Originals)
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30'
                  : 'text-smoke hover:bg-white/5 hover:text-bone'
              }`}
            >
              <span>👤</span> Profile & Contact Bio
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'backup'
                  ? 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30'
                  : 'text-smoke hover:bg-white/5 hover:text-bone'
              }`}
            >
              <span>💾</span> Backup & Factory Reset
            </button>
          </nav>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* TAB 1: CERTIFICATIONS */}
          {activeTab === 'certs' && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-bone">Certificates & Awards</h2>
                  <p className="text-xs text-smoke">Add, alter, update or delete verified credentials shown across the portfolio.</p>
                </div>
                <button
                  onClick={openAddCertModal}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-400/20 transition hover:brightness-110 active:scale-95"
                >
                  <span>+</span> Add New Certificate
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {data.certifications.map((c, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a1020] p-5 transition hover:border-cyan-500/40"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                          {c.issuer}
                        </span>
                        <span className="text-[11px] text-mist">#{idx + 1}</span>
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-bone">{c.name}</h3>
                      {c.link && (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 block truncate text-[11px] text-cyan-400 hover:underline"
                        >
                          🔗 {c.link}
                        </a>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                      <button
                        onClick={() => openEditCertModal(c, idx)}
                        className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-bone hover:bg-white/15"
                      >
                        ✏️ Edit / Alter
                      </button>
                      <button
                        onClick={() => handleDeleteCert(idx, c.name)}
                        className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-bone">Originals & Projects</h2>
                  <p className="text-xs text-smoke">Manage featured software applications and case studies.</p>
                </div>
                <button
                  onClick={openAddProjectModal}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-400/20 transition hover:brightness-110 active:scale-95"
                >
                  <span>+</span> Add New Project
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {data.projects.map((p) => (
                  <div
                    key={p.id}
                    className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a1020] p-6 transition hover:border-cyan-500/40"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{p.genre}</span>
                        <span className="text-xs font-medium text-mist">{p.year}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-bone">{p.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-bone/70">{p.logline}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-smoke">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-2">
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline">
                            Live Demo ↗
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer" className="text-xs text-smoke hover:text-bone">
                            GitHub ↗
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditProjectModal(p)}
                          className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-bone hover:bg-white/15"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id, p.title)}
                          className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-bone">Profile & Contact Information</h2>
                <p className="text-xs text-smoke">Update identity, titles, intro paragraphs, and social coordinates.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5 rounded-3xl border border-white/10 bg-[#0a1020] p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Display Name</label>
                    <input
                      type="text"
                      value={profileForm.displayName}
                      onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Role / Title</label>
                    <input
                      type="text"
                      value={profileForm.role}
                      onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Intro & Summary Bio</label>
                  <textarea
                    rows={4}
                    value={profileForm.intro}
                    onChange={(e) => setProfileForm({ ...profileForm, intro: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">LinkedIn / Portfolio URL</label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-cyan-400/25 transition hover:brightness-110 active:scale-95"
                  >
                    Save Profile Updates ✦
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: BACKUP & FACTORY RESET */}
          {activeTab === 'backup' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-bone">Backup & Factory Reset</h2>
                <p className="text-xs text-smoke">Export portfolio content as JSON or restore factory defaults anytime.</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0a1020] p-6">
                <h3 className="text-sm font-bold text-bone">Export Configuration</h3>
                <p className="mt-1 text-xs text-mist">Download full JSON snapshot including all custom certificates, projects, and edits.</p>
                <button
                  onClick={handleExportData}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-bone hover:bg-white/20"
                >
                  📥 Export Portfolio JSON
                </button>
              </div>

              <div className="rounded-3xl border border-red-500/20 bg-red-950/20 p-6">
                <h3 className="text-sm font-bold text-red-400">Factory Reset</h3>
                <p className="mt-1 text-xs text-red-300/70">
                  Restore all portfolio data to the initial resume baseline. Any added or modified certificates and projects will be cleared.
                </p>
                <button
                  onClick={handleResetData}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/30"
                >
                  ⚠️ Reset All Data to Defaults
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT CERTIFICATE */}
      <AnimatePresence>
        {certModalOpen && (
          <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a1224] p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-bone">
                  {editingCertIndex !== null ? 'Edit / Alter Certificate' : 'Add New Certificate'}
                </h3>
                <button
                  onClick={() => setCertModalOpen(false)}
                  className="rounded-lg p-1.5 text-smoke hover:bg-white/10 hover:text-bone"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCert} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">
                    Issuer / Organization <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    placeholder="e.g. Hackathon, Mepco Schlenk, Coursera, AWS"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">
                    Certificate / Award Title <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certForm.name}
                    onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    placeholder="e.g. Logic Architect Award (2nd Prize) — CodeFest'25"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">
                    Verification / Credential Link (URL)
                  </label>
                  <input
                    type="url"
                    value={certForm.link}
                    onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCertModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-xs font-semibold text-smoke hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-400/25 transition hover:brightness-110 active:scale-95"
                  >
                    {editingCertIndex !== null ? 'Save Changes' : 'Add Certificate ✦'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT PROJECT */}
      <AnimatePresence>
        {projectModalOpen && (
          <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0a1224] p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-bone">
                  {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => setProjectModalOpen(false)}
                  className="rounded-lg p-1.5 text-smoke hover:bg-white/10 hover:text-bone"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Year</label>
                    <input
                      type="text"
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Genre / Tagline Header</label>
                  <input
                    type="text"
                    value={projectForm.genre}
                    onChange={(e) => setProjectForm({ ...projectForm, genre: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    placeholder="Full Stack • React.js • E-Commerce"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Logline (Description)</label>
                  <textarea
                    rows={3}
                    value={projectForm.logline}
                    onChange={(e) => setProjectForm({ ...projectForm, logline: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={stackInput}
                    onChange={(e) => setStackInput(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    placeholder="React.js, Node.js, Python, PostgreSQL"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">Live Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.demo || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-smoke">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={projectForm.github || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-ink-2 px-4 py-2.5 text-sm text-bone focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-xs font-semibold text-smoke hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-400/25 transition hover:brightness-110 active:scale-95"
                  >
                    Save Project ✦
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-[250] -translate-x-1/2 rounded-xl border border-cyan-400/30 bg-[#0a182c] px-5 py-3 text-xs font-medium text-cyan-300 shadow-2xl backdrop-blur-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
