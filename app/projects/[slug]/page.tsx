import { getProjectById, projects } from '@/lib/projects';
import PageLayout from '@/components/PageLayout';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectById(params.slug);
  if (!project) notFound();

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)]">
        <div className="mb-[clamp(1rem,2vw,2rem)]">
          <a href="/projects" className="text-cosmic-400 hover:text-cosmic-300">
            ← Back to Projects
          </a>
        </div>

        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2vw,1.5rem)]">
          {project.title}
        </h1>
        <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-slate-400 mb-[clamp(2rem,4vw,3rem)]">
          {project.description}
        </p>

        {project.image && (
          <div className="relative w-full h-[clamp(20rem,40vw,40rem)] rounded-lg overflow-hidden mb-[clamp(2rem,4vw,3rem)]">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,3vw,2rem)] mb-[clamp(2rem,4vw,3rem)]">
          <div>
            <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold mb-[clamp(0.5rem,1vw,1rem)]">About</h2>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-slate-300">
              {project.longDescription || project.description}
            </p>
          </div>

          <div>
            <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold mb-[clamp(0.5rem,1vw,1rem)]">Technologies</h2>
            <div className="flex flex-wrap gap-[clamp(0.25rem,1vw,0.5rem)]">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-cosmic-500/20 text-cosmic-300 border border-cosmic-500/30">
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold mt-[clamp(1rem,2vw,1.5rem)] mb-[clamp(0.5rem,1vw,1rem)]">Tags</h2>
            <div className="flex flex-wrap gap-[clamp(0.25rem,1vw,0.5rem)]">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-[clamp(0.5rem,2vw,1rem)]">
          {project.links.github && (
            <a href={project.links.github} className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-[clamp(0.875rem,2vw,1rem)]">
              View Code
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} className="px-6 py-3 rounded-lg bg-cosmic-600 hover:bg-cosmic-700 transition text-[clamp(0.875rem,2vw,1rem)]">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
