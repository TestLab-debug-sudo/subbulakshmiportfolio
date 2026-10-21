import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import { PortfolioProvider } from './context/PortfolioContext';
import AdminPortal from './components/admin/AdminPortal';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueWatching from './components/ContinueWatching';
import Scene from './components/Scene';
import About from './components/About';
import Seasons from './components/Seasons';
import Originals from './components/Originals';
import TopPicks from './components/TopPicks';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import { EASE } from './components/fx';

// Overlays are only needed on demand — split them out of the first load.
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

type Stage = 'opening' | 'profiles' | 'home';

const STORAGE_KEY = 'subbulakshmi-series-profile';

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function App() {
  return (
    <PortfolioProvider>
      <SmoothScrollProvider>
        <Series />
      </SmoothScrollProvider>
    </PortfolioProvider>
  );
}

function isPathAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
}

function Series() {
  const stored = readStoredProfile();
  const [stage, setStage] = useState<Stage>(stored ? 'home' : 'opening');
  const [profileId, setProfileId] = useState<ProfileId>(stored ?? 'subbulakshmi');
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState<boolean>(isPathAdmin);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  // Listen to popstate / location changes for /admin
  useEffect(() => {
    const handleLocation = () => {
      if (isPathAdmin()) {
        setAdminOpen(true);
        setPreviewMode(false);
      }
    };
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Keyboard shortcut: Ctrl + Shift + A to open Admin
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen((prev) => {
          const next = !prev;
          if (next) window.history.pushState(null, '', '/admin');
          else if (window.location.pathname.startsWith('/admin')) window.history.pushState(null, '', '/');
          return next;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeAdmin = useCallback(() => {
    setAdminOpen(false);
    setPreviewMode(false);
    if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
      window.history.pushState(null, '', '/');
    }
  }, []);

  const openAdmin = useCallback(() => {
    setAdminOpen(true);
    setPreviewMode(false);
    window.history.pushState(null, '', '/admin');
  }, []);

  const enterPreview = useCallback(() => {
    setAdminOpen(false);
    setPreviewMode(true);
  }, []);

  const order = viewerProfiles.find((p) => p.id === profileId)!.order;

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage unavailable — profile simply won't persist */
      }
      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Now watching as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0 });
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {stage === 'opening' && <OpeningSequence key="opening" onDone={() => setStage('profiles')} />}
        {stage === 'profiles' && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === 'home' && (
        <motion.div initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE }}>
          <Navbar order={order} profileId={profileId} onSwitch={pickProfile} />
          <main id="main-content">
            <Hero key={`hero-${profileId}`} onPlay={() => setPlaying(true)} onResume={() => setResumeOpen(true)} profileId={profileId} />
            <ContinueWatching order={order} />
            {order.map((id) => (
              <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => setStage('opening')} />
          </main>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Live Preview Mode Indicator */}
      <AnimatePresence>
        {previewMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-[220] flex items-center gap-3 rounded-full border border-cyan-500/40 bg-[#050e1a]/95 px-4 py-2 shadow-2xl backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="text-xs font-semibold text-cyan-300">Live Preview Mode</span>
            <button
              onClick={openAdmin}
              className="rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-bold text-black transition hover:bg-cyan-300 active:scale-95"
            >
              Open Admin Console ↗
            </button>
            <button
              onClick={() => setPreviewMode(false)}
              className="text-xs text-smoke hover:text-bone"
              title="Close Preview Bar"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Admin Portal Modal */}
      <AnimatePresence>
        {adminOpen && (
          <AdminPortal onClose={closeAdmin} onPreview={enterPreview} />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
