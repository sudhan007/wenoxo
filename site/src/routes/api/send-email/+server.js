import { json } from '@sveltejs/kit';
import { config } from 'dotenv';

config();

// Use environment variable for Resend API key
const RESEND_API_KEY ='re_66pR8Bxz_F9P8ckYwHigTBobFKt6hoNY8';

export async function POST({ request}) {
  try {
    // Parse FormData from the request
    const formData = await request.formData();
    const services = formData.get('services')?.toString() || 'None selected';
    const name = formData.get('name')?.toString();
    const phone = formData.get('phone')?.toString();
    const email = formData.get('email')?.toString();
    const message = formData.get('message')?.toString() || 'No message provided';

    // Validate required fields
    if (!name || !phone || !email) {
      throw new Error('Name, phone, and email are required.');
    }

    // Prepare email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Services:</strong> ${services}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send email using Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from:'Acme <onboarding@resend.dev>',
        to: ['dualtricks.ssr@gmail.com'],
        subject: `New Contact from ${name}`,
        html: emailHtml
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Resend API error: ${errorData.message || res.statusText}`);
    }

    const data = await res.json();
    return json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}