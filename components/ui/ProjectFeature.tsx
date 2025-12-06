"use client";
import { motion } from "framer-motion";

export default function ProjectFeature({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30"
    >
      <div className="text-blue-300 text-3xl">{icon}</div>

      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-slate-400 text-sm mt-1">{desc}</p>
      </div>
    </motion.div>
  );
}
