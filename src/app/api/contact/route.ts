import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid request body');
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().replace(/[\r\n]+/g, ' ') : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return badRequest('Missing required fields');
  }
  if (!EMAIL_REGEX.test(email)) {
    return badRequest('Invalid email format');
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return badRequest('Message is too long');
  }

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAFAF7; color: #1B1B18; padding: 24px; border: 1px solid #E7E6DF;">
        <h2 style="color: #3B5B7A; border-bottom: 1px solid #E7E6DF; padding-bottom: 12px; font-size: 16px; font-weight: 600;">
          New message from your portfolio
        </h2>
        <div style="margin-top: 16px; font-size: 14px; line-height: 1.6;">
          <p style="margin: 4px 0;"><span style="color: #6F6F68;">From:</span> ${safeName} &lt;<a href="mailto:${safeEmail}" style="color: #3B5B7A; text-decoration: none;">${safeEmail}</a>&gt;</p>

          <div style="border-top: 1px solid #E7E6DF; margin-top: 16px; padding-top: 16px; color: #1B1B18;">
            ${safeMessage}
          </div>
        </div>
      </div>
    `;

    const emailText = `
New message from your portfolio

From: ${name} <${email}>

${message}
    `;

    const subject = `${name} (via portfolio)`;

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (resendApiKey && resendFromEmail) {
      const resend = new Resend(resendApiKey);
      const recipientEmail = process.env.EMAIL_RECIPIENT || resendFromEmail;

      const { error } = await resend.emails.send({
        from: resendFromEmail,
        to: recipientEmail,
        replyTo: email,
        subject,
        html: emailHtml,
        text: emailText,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
      }

      return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    }

    // Fallback to SMTP (nodemailer)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_USER_PASS;
    const emailHost = process.env.EMAIL_HOST || 'smtp.zoho.com';
    const emailPort = parseInt(process.env.EMAIL_PORT || '587', 10);
    const emailSecure = process.env.EMAIL_SECURE === 'true' || emailPort === 465;
    const smtpRecipientEmail = process.env.EMAIL_RECIPIENT || emailUser;

    if (!emailUser || !emailPass) {
      console.error('Missing email credentials');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: smtpRecipientEmail,
      replyTo: email,
      subject,
      html: emailHtml,
      text: emailText,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
