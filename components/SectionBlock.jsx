"use client";
import { motion } from "framer-motion";

export default function SectionBlock({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className={`py-16 ${className}`}
    >
      {children}
    </motion.section>
  );
}
