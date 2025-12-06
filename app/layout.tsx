import './globals.css';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShaderBackground from '@/components/ShaderBackground';
import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';
import AppProviders from '@/components/providers/AppProviders';
import CommandPanel from '@/components/ui/CommandPanel';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Vivek Verma — CosmicEscape',
  description:
    'Machine Learning Engineer exploring the cosmic edge of AI with production-grade systems.',
  keywords: ['Machine Learning', 'AI', 'ML Engineer', 'Neural Networks', 'Deep Learning'],
  authors: [{ name: 'Vivek Verma' }],
  creator: 'Vivek Verma',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cosmic-escape.vercel.app',
    siteName: 'CosmicEscape',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@vivekverma',
  },
};

// Dynamic import with { ssr: false } ensures it only runs on the client
const PageTransition = dynamic(() => import('@/components/ui/PageTransition'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </head>
      <body className="min-h-screen bg-slate-900 text-slate-50 overflow-x-hidden relative">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ShaderBackground palette="carbon" intensity={0.25} scale={1.15} />
        <NeuralNetworkBackground palette="techBlue" />

        <AppProviders>
          <Navbar />

          <PageTransition>
            <main
                id="main-content"
                className="relative z-20 w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 max-w-screen-xl mx-auto"
                role="main"
            >
                {children}
            </main>
            </PageTransition>


          <Footer />
          <CommandPanel />
        </AppProviders>
      </body>
    </html>
  );
}
