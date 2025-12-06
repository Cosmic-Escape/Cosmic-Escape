import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">
          Oops! Page not found.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-cosmic-600 hover:bg-cosmic-700 transition"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}