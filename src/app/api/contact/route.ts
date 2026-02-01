import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email content (shared between both methods)
    const emailHtml = `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #e4e4e7; padding: 20px; border: 1px solid #27272a;">
        <h2 style="color: #22c55e; border-bottom: 1px solid #27272a; padding-bottom: 10px; font-size: 18px;">
          > New Transmission
        </h2>
        <div style="margin-top: 20px; font-size: 14px;">
          <p style="margin: 5px 0;"><span style="color: #71717a;">To:</span> me@harshgajjar.dev</p>
          <p style="margin: 5px 0;"><span style="color: #71717a;">From:</span> <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></p>
          <p style="margin: 5px 0;"><span style="color: #71717a;">Subject:</span> ${name}</p>
          
          <div style="border-top: 1px solid #27272a; margin-top: 15px; padding-top: 15px;">
            <p style="margin-bottom: 10px; color: #a1a1aa;">&gt; Message:</p>
            <div style="color: #e4e4e7; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        <p style="margin-top: 30px; border-top: 1px solid #27272a; pt: 10px; color: #52525b; font-size: 10px;">
          -- end of transmission --
        </p>
      </div>
    `;

    const emailText = `
> New Transmission

To: me@harshgajjar.dev
From: ${email}
Subject: ${name}

> Message:
${message}

-- end of transmission --
    `;

    const subject = `${name} [via Portfolio]`;

    // Check if Resend API key is available (preferred method)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (resendApiKey && resendFromEmail) {
      // Use Resend API
      const resend = new Resend(resendApiKey);
      const recipientEmail = process.env.EMAIL_RECIPIENT || resendFromEmail;

      await resend.emails.send({
        from: resendFromEmail,
        to: recipientEmail,
        replyTo: email,
        subject: subject,
        html: emailHtml,
        text: emailText,
      });

      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
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
        { error: 'Email service not configured. Please set either RESEND_API_KEY and RESEND_FROM_EMAIL, or EMAIL_USER and EMAIL_USER_PASS.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Send email via SMTP
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: smtpRecipientEmail,
      replyTo: email,
      subject: subject,
      html: emailHtml,
      text: emailText,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
