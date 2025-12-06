"use client";
import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="p-6 bg-[#121212] rounded-xl border border-white/10 hover:border-purple-500/40
                 transition shadow-lg shadow-black/20"
    >
      <div className="mb-4">
        {Icon && <Icon className="w-10 h-10 text-purple-400" />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
