'use client';

import { useState, useEffect } from 'react';

interface MaskedHeroProps {
  title?: string;
  subtitle?: string;
}

export default function MaskedHero({
  title = 'Vivek Verma',
  subtitle = 'Crafting intelligent systems that learn & evolve',
}: MaskedHeroProps) {
  const [maskId, setMaskId] = useState<string>('');

  useEffect(() => {
    setMaskId(`mask-${Math.random().toString(36).slice(2, 9)}`);
  }, []);

  if (!maskId) return null;

  return (
    <section className="relative isolate overflow-visible py-[clamp(6rem,15vw,12rem)]">
      <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)]">
        <div className="max-w-4xl">
          <svg
            viewBox="0 0 1200 200"
            className="w-full h-[clamp(20vh,30vw,40vh)]"
            role="img"
          >
            <defs>
              <mask id={maskId}>
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fontWeight="900"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontSize="6vw"
                  fill="white"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {title}
                </text>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="white" mask={`url(#${maskId})`} />
          </svg>

          <p className="mt-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,2.5vw,1.25rem)] text-slate-300 max-w-2xl">
            {subtitle}
          </p>

          <div className="mt-[clamp(2rem,4vw,3rem)] flex gap-[clamp(0.5rem,2vw,1rem)] flex-wrap">
            <a
              href="/projects"
              className="px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-lg bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white font-semibold hover:from-cosmic-700 hover:to-cosmic-600 transition"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-lg border border-slate-600 hover:border-cosmic-400 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/30 mix-blend-multiply"
      />
    </section>
  );
}
