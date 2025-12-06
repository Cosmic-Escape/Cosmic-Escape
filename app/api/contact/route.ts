
/**
 * app/api/contact/route.ts
 * Serverless contact form API with validation, rate limiting, and email sending
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Simple in-memory rate limiter (IP-based)
const rateLimitMap = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 requests per hour per IP

/**
 * Check if IP has exceeded rate limit
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove old timestamps
  const filtered = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (filtered.length >= RATE_LIMIT_MAX) {
    return true;
  }

  filtered.push(now);
  rateLimitMap.set(ip, filtered);
  return false;
}

/**
 * Get client IP address
 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.ip ||
    'unknown'
  );
}

/**
 * Contact form validation schema
 */
const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  message: z.string().min(10).max(5000).trim(),
  honeypot: z.string().optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Send email via SendGrid or console (dev mode)
 */
async function sendEmail(data: ContactPayload): Promise<boolean> {
  const { name, email, message } = data;

  // Development: log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Contact form submission (DEV MODE):', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  // Production: try SendGrid
  if (process.env.SENDGRID_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: process.env.CONTACT_TO_EMAIL }],
              subject: `New contact form submission from ${name}`,
            },
          ],
          from: {
            email: 'noreply@cosmic-escape.vercel.app',
            name: 'CosmicEscape',
          },
          content: [
            {
              type: 'text/html',
              value: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Message:</strong></p>
                <pre>${escapeHtml(message)}</pre>
                <hr>
                <p><small>Sent from CosmicEscape contact form</small></p>
              `,
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error(`SendGrid error: ${response.status}`);
        return false;
      }

      console.log('✅ Email sent via SendGrid');
      return true;
    } catch (err) {
      console.error('❌ SendGrid error:', err);
      return false;
    }
  }

  console.error('❌ No mail service configured');
  return false;
}

/**
 * HTML escape for safe email content
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * POST /api/contact
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const clientIp = getClientIp(request);

    // Rate limiting
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse request
    const body = await request.json();

    // Honeypot: if filled, silently succeed (anti-spam)
    if (body.honeypot) {
      console.warn('🍯 Honeypot triggered from', clientIp);
      return NextResponse.json(
        {
          ok: true,
          message: 'Message received',
        },
        { status: 200 }
      );
    }

    // Validate
    const data = contactSchema.parse({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    // Send email
    const emailSent = await sendEmail(data);

    if (!emailSent) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Failed to send message. Please try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Message sent successfully. I will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (err) {
    // Validation error
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid input',
          errors: err.flatten(),
        },
        { status: 400 }
      );
    }

    // Server error
    console.error('❌ Contact API error:', err);
    return NextResponse.json(
      {
        ok: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact (CORS preflight)
 */
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}