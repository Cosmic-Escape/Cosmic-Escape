'use client';

import ProjectCard from './ProjectCard';
import { projects } from '@/lib/projects';

export default function ProjectsGrid() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}