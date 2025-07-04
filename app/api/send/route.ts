import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
          .email-container { background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .field-group { margin-bottom: 25px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea; }
          .field-label { font-weight: 600; color: #495057; font-size: 14px; margin-bottom: 8px; display: block; }
          .field-value { font-size: 16px; color: #212529; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
          .footer p { margin: 0; color: #6c757d; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header"><h1>📧 New Contact Form Message</h1></div>
          <div class="content">
            <div class="field-group"><span class="field-label">👤 Full Name</span><div class="field-value">${name}</div></div>
            <div class="field-group"><span class="field-label">📧 Email Address</span><div class="field-value">${email}</div></div>
            <div class="field-group"><span class="field-label">📋 Subject</span><div class="field-value">${subject}</div></div>
            <div class="field-group"><span class="field-label">💬 Message</span><div class="field-value">${message}</div></div>
          </div>
          <div class="footer"><p>This email was sent from your portfolio. Reply to ${email}.</p></div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      replyTo: email,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `🔔 New Contact: ${subject}`,
      html: htmlTemplate,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
