'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => setCurrentYear(new Date().getFullYear()), []);

  if (currentYear === null) return null;

  return (
    <footer className="relative z-20 border-t border-slate-700/30 mt-[clamp(4rem,10vw,6rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[clamp(1rem,3vw,2rem)] mb-[clamp(2rem,5vw,4rem)]">
          
          {/* Brand */}
          <div>
            <p className="font-bold mb-[clamp(0.25rem,1vw,0.5rem)]" style={{ fontSize: 'clamp(1rem,3vw,1.5rem)' }}>
              <span className="text-cosmic-500">Cosmic</span>Escape
            </p>
            <p className="text-slate-400" style={{ fontSize: 'clamp(0.75rem,2vw,1.25rem)' }}>
              ML Engineer Portfolio
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-[clamp(0.5rem,1vw,1rem)]" style={{ fontSize: 'clamp(0.875rem,2.5vw,1.25rem)' }}>
              Navigation
            </h4>
            <ul className="space-y-[clamp(0.25rem,1vw,0.5rem)]" style={{ fontSize: 'clamp(0.75rem,2vw,1.25rem)' }}>
              <li><a href="/projects" className="hover:text-cosmic-400 transition">Projects</a></li>
              <li><a href="/blog" className="hover:text-cosmic-400 transition">Blog</a></li>
              <li><a href="/experiments" className="hover:text-cosmic-400 transition">Experiments</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-[clamp(0.5rem,1vw,1rem)]" style={{ fontSize: 'clamp(0.875rem,2.5vw,1.25rem)' }}>
              Connect
            </h4>
            <ul className="space-y-[clamp(0.25rem,1vw,0.5rem)]" style={{ fontSize: 'clamp(0.75rem,2vw,1.25rem)' }}>
              <li><a href="/contact" className="hover:text-cosmic-400 transition">Contact</a></li>
              <li><a href="https://github.com" className="hover:text-cosmic-400 transition">GitHub</a></li>
              <li><a href="https://linkedin.com" className="hover:text-cosmic-400 transition">LinkedIn</a></li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-semibold mb-[clamp(0.5rem,1vw,1rem)]" style={{ fontSize: 'clamp(0.875rem,2.5vw,1.25rem)' }}>
              Status
            </h4>
            <p className="text-slate-400" style={{ fontSize: 'clamp(0.75rem,2vw,1.25rem)' }}>
              🟢 Available for consulting
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/30 pt-[clamp(1rem,3vw,2rem)] flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400" style={{ fontSize: 'clamp(0.75rem,2vw,1.25rem)' }}>
          <p>© {currentYear} Vivek Verma. All rights reserved.</p>
          <p>Built with Next.js + TypeScript + TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
}
