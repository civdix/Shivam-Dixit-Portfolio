import { timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function hasValidToken(request: Request, expectedToken: string) {
  const authorization = request.headers.get("authorization");
  const prefix = "Bearer ";

  if (!authorization?.startsWith(prefix)) {
    return false;
  }

  const receivedToken = Buffer.from(authorization.slice(prefix.length));
  const configuredToken = Buffer.from(expectedToken);

  return (
    receivedToken.length === configuredToken.length &&
    timingSafeEqual(receivedToken, configuredToken)
  );
}

export async function POST(request: Request) {
  const apiToken = process.env.EMAIL_API_TOKEN;

  if (!apiToken || !hasValidToken(request, apiToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subject = request.headers.get("x-email-subject")?.trim();
  const recipient = request.headers.get("x-email-to")?.trim();
  const text = request.headers.get("x-email-text")?.trim();
  const html = request.headers.get("x-email-html")?.trim();

  if (!recipient) {
    return NextResponse.json(
      { error: "The X-Email-To header is required" },
      { status: 400 },
    );
  }

  if (!subject) {
    return NextResponse.json(
      { error: "The X-Email-Subject header is required" },
      { status: 400 },
    );
  }

  if (!text && !html) {
    return NextResponse.json(
      { error: "Provide X-Email-Text or X-Email-HTML" },
      { status: 400 },
    );
  }

  const requiredEnvironment = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "EMAIL_FROM",
  ];
  const missingEnvironment = requiredEnvironment.filter(
    (name) => !process.env[name],
  );

  if (missingEnvironment.length > 0) {
    console.error("Email configuration is missing", missingEnvironment);
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 },
    );
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    return NextResponse.json(
      { error: "SMTP_PORT must be a valid port number" },
      { status: 500 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipient,
      replyTo: request.headers.get("x-email-reply-to")?.trim() || undefined,
      subject,
      text: text || undefined,
      html: html || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email delivery failed", error);
    return NextResponse.json(
      { error: "Email could not be sent" },
      { status: 502 },
    );
  }
}