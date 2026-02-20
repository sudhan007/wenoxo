import { json } from '@sveltejs/kit';
import { RESEND_API_KEY2 } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();

        const role = formData.get('role')?.toString();
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const cvFile = formData.get('cv') as File;

        // Validation
        if (!role || !name || !email) {
            return json(
                { success: false, error: 'All fields are required.' },
                { status: 400 }
            );
        }

        if (!cvFile || cvFile.size === 0) {
            return json(
                { success: false, error: 'CV file is required.' },
                { status: 400 }
            );
        }

        // Convert file to base64 for email attachment
        const arrayBuffer = await cvFile.arrayBuffer();
        const base64Content = Buffer.from(arrayBuffer).toString('base64');

        // Prepare email HTML
        const adminEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                    .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #1e40af; }
                    .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; }
                    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">New Career Application Received</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Position Applied For:</div>
                            <div class="value">${role}</div>
                        </div>
                        <div class="field">
                            <div class="label">Candidate Name:</div>
                            <div class="value">${name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Email Address:</div>
                            <div class="value">${email}</div>
                        </div>
                    
                        <div class="field">
                            <div class="label">CV Attached:</div>
                            <div class="value">${cvFile.name} (${(cvFile.size / 1024).toFixed(2)} KB)</div>
                        </div>
                        <div class="footer">
                            <p>This application was submitted through the Wenoxo Careers page.</p>
                            <p>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send email with Resend API
        console.log('Sending career application email...');
        const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${RESEND_API_KEY2}`,
            },
            body: JSON.stringify({
                from: 'Wenoxo Careers <onboarding@resend.dev>',
                to: ['hrm@wenoxo.in'],
                reply_to: email,
                subject: `New Application: ${role} - ${name}`,
                html: adminEmailHtml,
                attachments: [
                    {
                        filename: cvFile.name,
                        content: base64Content,
                    }
                ]
            }),
        });

        if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { message: errorText };
            }

            console.error('Resend API error:', errorData);
            throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
        }

        const emailResult = await emailResponse.json();
        console.log('Email sent successfully:', emailResult);

        return json(
            {
                success: true,
                message: 'Application submitted successfully!',
                emailId: emailResult.id
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error processing career application:', error);
        return json(
            {
                success: false,
                error: error.message || 'Failed to submit application. Please try again.'
            },
            { status: 500 }
        );
    }
}