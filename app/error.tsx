'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Error</h1>
        <p className="text-xl text-slate-400 mb-8">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-block px-6 py-3 rounded-lg bg-cosmic-600 hover:bg-cosmic-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}