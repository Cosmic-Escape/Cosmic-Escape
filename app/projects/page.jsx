import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import ProjectsGrid from '@/components/ProjectsGrid';

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-[clamp(90%,1200px)] px-[clamp(1rem,4vw,5rem)]">
        <SectionHeader
          title="Projects"
          subtitle="A curated selection of my engineering work."
        />
        <ProjectsGrid />
      </div>
    </PageLayout>
  );
}
