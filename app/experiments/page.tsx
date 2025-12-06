import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

export default function ExperimentsPage() {
  return (
    <PageLayout>
      <SectionHeader
        title="Experiments"
        subtitle="Interactive demos and visualizations of ML concepts."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-slate-700 bg-white/5">
          <h3 className="text-xl font-semibold mb-2">Neural Network Viz</h3>
          <p className="text-slate-400 mb-4">
            Explore how neural networks learn through interactive visualization
          </p>
          <a
            href="#"
            className="text-cosmic-400 hover:text-cosmic-300 font-medium"
          >
            Coming Soon →
          </a>
        </div>

        <div className="p-6 rounded-lg border border-slate-700 bg-white/5">
          <h3 className="text-xl font-semibold mb-2">Gradient Descent</h3>
          <p className="text-slate-400 mb-4">
            Watch optimization algorithms in action with 3D surface plots
          </p>
          <a
            href="#"
            className="text-cosmic-400 hover:text-cosmic-300 font-medium"
          >
            Coming Soon →
          </a>
        </div>
      </div>
    </PageLayout>
  );
}