import { NextResponse } from "next/server";
import { createEmailTransporter, getMissingEmailEnvironment } from "@/lib/email";

export const runtime = "nodejs";

const fallbackRecipient = "dixitshivam249@gmail.com";

export async function POST(request: Request) {
  const missingEnvironment = getMissingEmailEnvironment();
  if (missingEnvironment.length > 0) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (body.website || name.length < 2 || name.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 20 || message.length > 4000) {
    return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
  }

  try {
    const transporter = createEmailTransporter();
    const recipient = process.env.EMAIL_TO || fallbackRecipient;
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipient,
      replyTo: email,
      subject: `Founder inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return NextResponse.json({ error: "Email could not be sent" }, { status: 502 });
  }
}