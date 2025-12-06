'use client';

import { ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import MotionProvider from './MotionProvider';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  );
}
