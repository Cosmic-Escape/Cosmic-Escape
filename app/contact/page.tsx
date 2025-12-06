'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

export default function ContactPage() {
  const [status, setStatus] = useState<null | 'sending' | 'ok' | 'error'>(null);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.ok) {
        setStatus('ok');
        setMessage(json.message);
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(json.message || 'Failed to send message');
        console.error(json);
      }
    } catch (err) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
      console.error(err);
    }
  }

  return (
    <PageLayout>
      <SectionHeader
        title="Contact"
        subtitle="Reach out for collaborations, consulting or project partnerships."
      />

      <div className="max-w-2xl">
        {status === 'ok' && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300">
            {message}
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cosmic-500 focus:outline-none transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cosmic-500 focus:outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cosmic-500 focus:outline-none transition resize-none"
              placeholder="Your message..."
            />
          </div>

          <input type="hidden" name="honeypot" value="" />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 rounded-lg bg-cosmic-600 hover:bg-cosmic-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
