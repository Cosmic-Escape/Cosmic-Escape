'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TechCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  tags?: string[];
  href?: string;
}

export default function TechCard({
  title,
  description,
  icon,
  tags = [],
  href,
}: TechCardProps) {
  const Card = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cosmic-500/40 hover:shadow-lg hover:shadow-cosmic-500/20 transition-all group"
    >
      {icon && (
        <div className="mb-4 text-cosmic-400 text-3xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>

      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{Card}</a>;
  }

  return Card;
}
