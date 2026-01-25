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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #4F46E5;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
    `;

    const subject = `New Contact Form Submission from ${name}`;

    // Check if Resend API key is available (preferred method)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const recipientEmail = process.env.EMAIL_RECIPIENT || resendFromEmail;

    if (resendApiKey && resendFromEmail) {
      // Use Resend API
      const resend = new Resend(resendApiKey);

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
