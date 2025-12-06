/**
 * lib/projects.ts
 * Initial project data for CosmicEscape portfolio
 */

import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'neural-sentiment',
    title: 'Neural Sentiment Engine',
    description: 'Real-time sentiment analysis using transformer models',
    longDescription:
      'A production-grade sentiment analysis system leveraging fine-tuned BERT models. Processes 100k+ documents daily with <50ms latency. Deployed on containerized GPU infrastructure with Redis caching.',
    image: '/images/project-1.jpg',
    technologies: ['PyTorch', 'BERT', 'FastAPI', 'Redis', 'Docker', 'Kubernetes'],
    tags: ['NLP', 'Production', 'ML Ops'],
    links: {
      github: 'https://github.com/vivekverma/neural-sentiment',
      demo: 'https://sentiment-engine.example.com',
    },
    year: 2024,
    featured: true,
  },
  {
    id: 'quantum-classifier',
    title: 'Quantum-Classical Hybrid Classifier',
    description: 'Hybrid quantum circuits for classification tasks',
    longDescription:
      'Experimental work combining quantum circuits with classical neural networks. Demonstrates 15% accuracy improvement on synthetic classification benchmarks compared to classical baselines.',
    image: '/images/project-2.jpg',
    technologies: ['Qiskit', 'PyTorch', 'NumPy', 'TensorFlow', 'Jupyter'],
    tags: ['Quantum Computing', 'Research', 'Experimental'],
    links: {
      github: 'https://github.com/vivekverma/quantum-classifier',
      post: 'https://blog.example.com/quantum-ml',
    },
    year: 2023,
    featured: true,
  },
  {
    id: 'reinforcement-bot',
    title: 'Multi-Agent RL Bot',
    description: 'Deep reinforcement learning for complex game environments',
    longDescription:
      'Multi-agent system using PPO and QMIX. Achieves superhuman performance in competitive scenarios through distributed training across 512 CPU cores.',
    image: '/images/project-3.jpg',
    technologies: ['PyTorch', 'PPO', 'QMIX', 'Ray', 'gRPC'],
    tags: ['Reinforcement Learning', 'Multi-Agent', 'Gaming'],
    links: {
      github: 'https://github.com/vivekverma/rl-bot',
      demo: 'https://rl-bot-visualizer.example.com',
    },
    year: 2024,
    featured: true,
  },
  {
    id: 'graph-embeddings',
    title: 'Knowledge Graph Embeddings',
    description: 'Learned embeddings for complex relational data',
    longDescription:
      'Implemented TransE, DistMult, and RotatE models for knowledge graph completion. 94% MRR on FB15k dataset with novel regularization techniques.',
    image: '/images/project-4.jpg',
    technologies: ['PyTorch', 'DGL', 'NumPy', 'Pandas'],
    tags: ['Graph Neural Networks', 'Knowledge Graphs', 'Research'],
    links: {
      github: 'https://github.com/vivekverma/graph-embeddings',
    },
    year: 2023,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}