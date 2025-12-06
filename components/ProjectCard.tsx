'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/types';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cosmic-500/40 transition-all hover:shadow-lg hover:shadow-cosmic-500/20"
      >
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-cosmic-400 transition">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-4">{project.description}</p>

          <div className="flex gap-2 flex-wrap mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-300">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                onClick={(e) => e.preventDefault()}
                className="text-xs px-3 py-1 rounded bg-cosmic-500/20 text-cosmic-300 hover:bg-cosmic-500/30 transition"
              >
                Code
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                onClick={(e) => e.preventDefault()}
                className="text-xs px-3 py-1 rounded bg-cosmic-500/20 text-cosmic-300 hover:bg-cosmic-500/30 transition"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
