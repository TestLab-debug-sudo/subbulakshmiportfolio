import SectionHeading from '../components/SectionHeading';
import ExperienceTimeline from '../components/ExperienceTimeline';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="EXPERIENCE TIMELINE"
          title="Industry Experience & Practical Internships"
          description="Hands-on software development roles spanning full-stack web engineering, component-driven React applications, and interactive game logic."
          align="center"
        />

        <div className="mt-12">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
}
