import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

export default function BlogPage() {
  return (
    <PageLayout>
      <SectionHeader
        title="Blog"
        subtitle="Thoughts on ML, systems, and product engineering."
      />

      <div className="space-y-6 md:space-y-8 lg:space-y-10">
        <article className="p-6 md:p-8 border border-slate-700 rounded-lg bg-white/5 hover:bg-white/10 transition">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
            Coming Soon
          </h3>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">
            I'm working on publishing in-depth case studies and technical deep
            dives. Check back soon!
          </p>
        </article>
      </div>
    </PageLayout>
  );
}
