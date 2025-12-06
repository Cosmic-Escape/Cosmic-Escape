'use client';

import { motion } from 'framer-motion';

interface KPI {
  label: string;
  value: string;
}

interface KPIRowProps {
  kpis: KPI[];
}

export default function KPIRow({ kpis }: KPIRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"
        >
          <p className="text-3xl md:text-4xl font-bold text-cosmic-400">
            {kpi.value}
          </p>
          <p className="text-sm text-slate-400 mt-2">{kpi.label}</p>
        </motion.div>
      ))}
    </div>
  );
}