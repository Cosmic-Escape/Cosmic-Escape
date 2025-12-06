/**
 * Core type definitions for CosmicEscape
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  tags: string[];
  links: {
    demo?: string;
    github?: string;
    post?: string;
  };
  year: number;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  published: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
  error?: string;
}

export type ShaderPalette = 'carbon' | 'neon' | 'ocean' | 'sunset';

export type NeuralPalette = 'techBlue' | 'cyberGrape' | 'emeraldTech';

export interface AnimationPreferences {
  enableMotion: boolean;
  enableShaders: boolean;
  enableParallax: boolean;
}