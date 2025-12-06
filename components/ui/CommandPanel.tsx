'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  id: string;
  label: string;
  href: string;
  category: string;
}

const commands: Command[] = [
  { id: '1', label: 'Home', href: '/', category: 'Navigation' },
  { id: '2', label: 'Projects', href: '/projects', category: 'Navigation' },
  { id: '3', label: 'Blog', href: '/blog', category: 'Navigation' },
  { id: '4', label: 'Contact', href: '/contact', category: 'Navigation' },
  {
    id: '5',
    label: 'Experiments',
    href: '/experiments',
    category: 'Navigation',
  },
];

export default function CommandPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <input
                  type="text"
                  placeholder="Search commands... (⌘K)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-white outline-none placeholder-slate-500"
                />
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filtered.length > 0 ? (
                  filtered.map((cmd) => (
                    <a
                      key={cmd.id}
                      href={cmd.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition flex justify-between items-center"
                    >
                      <span>{cmd.label}</span>
                      <span className="text-xs text-slate-500">
                        {cmd.category}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-slate-500">
                    No commands found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
