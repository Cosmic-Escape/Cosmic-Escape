import MaskedHero from '@/components/MaskedHero';
import KPIRow from '@/components/ui/KPIRow';
import ProjectsGrid from '@/components/ProjectsGrid';

export default function Home() {
  const kpis = [
    { label: 'Projects Shipped', value: '20+' },
    { label: 'ML Models Trained', value: '50+' },
    { label: 'Code Quality', value: '100%' },
    { label: 'Uptime', value: '99.9%' },
  ];

  return (
    <>
      <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)]">
        <MaskedHero
          title="Vivek Verma"
          subtitle="Crafting intelligent systems that learn & evolve"
        />
        <KPIRow kpis={kpis} />
      </div>

      <section className="py-[clamp(4rem,10vw,6rem)]">
        <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)] text-center">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2vw,2rem)]">
            Featured Projects
          </h2>
          <ProjectsGrid />
        </div>
      </section>

      <section className="py-[clamp(4rem,10vw,6rem)]">
        <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)] text-center">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2vw,1.5rem)]">
            Exploring AI at scale
          </h2>
          <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-slate-400 mb-[clamp(1rem,2vw,1.5rem)] max-w-2xl mx-auto">
            Building production-grade machine learning systems, from neural networks to quantum computing experiments. Focused on performance, scalability, and real-world impact.
          </p>
          <a
            href="/contact"
            className="inline-block px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-lg bg-cosmic-600 hover:bg-cosmic-700 transition text-[clamp(0.875rem,2vw,1rem)]"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
