import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProjectFeatureProps {
  icon: ReactNode;  // for a JSX element, like an SVG or component
  title: string;
  desc: string;
}

export default function ProjectFeature({ icon, title, desc }: ProjectFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="feature-card"
    >
      <div className="icon">{icon}</div>
      <h3 className="title">{title}</h3>
      <p className="desc">{desc}</p>
    </motion.div>
  );
}
