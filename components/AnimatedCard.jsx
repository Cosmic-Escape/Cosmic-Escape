"use client";

import { motion } from "framer-motion";

export default function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/40 hover:shadow-purple-500/20 transition"
    >
      {children}
    </motion.div>
  );
}
