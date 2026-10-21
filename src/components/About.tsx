import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE, SectionHeading } from './fx';
import Lanyard from './Lanyard';

export default function About() {
  const { data } = usePortfolio();
  const profile = data.profile;
  const education = data.education;
  const experience = data.experience;

  const facts = [
    { k: 'Education', v: education[0].degree, s: `${education[0].school} · ${education[0].score}` },
    { k: 'Experience', v: `${experience[0].role}`, s: `${experience[0].company} (${experience[0].period})` },
    { k: 'Primary stack', v: 'React.js & Python', s: 'Node.js, Django, SQL & REST APIs' },
    { k: 'Languages', v: 'English, Tamil, Hindi', s: profile.location },
  ];

  return (
    <>
      <SectionHeading kicker="The Pilot" title="About Me" />
      <div className="gutter grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="relative h-[620px] sm:h-[680px] w-full">
            {/* 3D Lanyard Component - Floating seamlessly without background box or border */}
            <div className="relative h-full w-full">
              <Lanyard
                frontImage="/assets/lanyard-front.png"
                backImage="/assets/lanyard-back.png"
                strapImage="/assets/lanyard-strap.png"
                cardColor="#050814"
                finish="glossy"
                metal="silver"
                size={0.80}
                strapLength={0.1}
                strapWidth={0.2}
                breeze={0.5}
                damping={0.45}
                elasticity={0.55}
                interactive={true}
                intro={true}
              />
            </div>

            {/* Interactive Hint without any border box */}
            <div className="pointer-events-none -mt-4 flex items-center justify-center gap-3 text-center">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-smoke">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                Interactive 3D Badge
              </span>
              <span className="text-[11px] text-mist/40">·</span>
              <span className="text-[10px] font-medium tracking-wide text-mist/70">
                Drag · Swing · Flip
              </span>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.p
            className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] italic leading-[1.15] text-bone"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            “{profile.intro}”
          </motion.p>
          <p className="mt-4 text-sm text-mist">— {profile.fullName}</p>

          <motion.dl
            className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
          >
            {facts.map((f) => (
              <motion.div
                key={f.k}
                className="bg-ink-2 p-5"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">{f.k}</dt>
                <dd className="mt-2 text-base font-semibold text-bone">{f.v}</dd>
                <dd className="mt-0.5 text-xs text-mist">{f.s}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="mt-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Interests</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <span key={i} className="glass rounded-full px-3 py-1.5 text-xs font-medium text-bone">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
