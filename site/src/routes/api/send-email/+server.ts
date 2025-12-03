import { json } from '@sveltejs/kit';
import { config } from 'dotenv';
import { VITE_RESEND_API_KEY } from '$env/static/private';
config();

// const VITE_RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

console.log('API Key loaded111:', VITE_RESEND_API_KEY ? 'Yes' : 'No');
console.log('API Key starts with:', VITE_RESEND_API_KEY);

export async function POST({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const services = formData.get('services')?.toString() || 'None selected';
    const name = formData.get('name')?.toString();
    const phone = formData.get('phone')?.toString();
    const email = formData.get('email')?.toString();
    const message = formData.get('message')?.toString() || 'No message provided';

    if (!name || !phone || !email) {
      throw new Error('Name, phone, and email are required.');
    }

    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Services:</strong> ${services}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Test with Resend's default domain first
    console.log('Attempting to send admin email...');
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Enquiry Form Submitted <onboarding@resend.dev>',
        to: ['info@wenoxo.in'],
        subject: `New Enquiry from ${name}`,
        html: adminEmailHtml,
      }),
    });

    // Enhanced error logging
    if (!adminRes.ok) {
      const errorText = await adminRes.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      throw new Error(`Resend API error (admin email): Status ${adminRes.status} - ${JSON.stringify(errorData)}`);
    }


    return json(
      { ok: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}