'use client';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 max-w-screen-xl mx-auto text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto md:mx-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}
