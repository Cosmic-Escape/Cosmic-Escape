'use client';

import { motion } from 'framer-motion';

interface HoloSectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function HoloSectionHeader({
  title,
  subtitle,
}: HoloSectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-sky-300 to-fuchsia-400 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
