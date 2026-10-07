"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Linkedin, Phone, Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

type FounderContactFormProps = {
  email: string;
  phone: string;
  linkedinUrl: string;
};

export default function FounderContactForm({ email, phone, linkedinUrl }: FounderContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks. Your message is on its way.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your message could not be sent.");
    }
  }

  return (
    <section id="contact" className="grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.7fr_1.3fr] lg:pt-16">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Have a useful problem?</h2>
        <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
          Tell me what you are building, where it is stuck, and what a good outcome looks like.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Name
            <input name="name" required maxLength={80} className="h-11 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input name="email" type="email" required maxLength={160} className="h-11 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          What can I help with?
          <textarea name="message" required minLength={20} maxLength={4000} rows={6} className="resize-y rounded-lg border border-border bg-background px-3 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20" />
        </label>
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
            <Send className="size-4" aria-hidden="true" />
            {status === "sending" ? "Sending..." : "Send inquiry"}
          </button>
          {status === "success" && <CheckCircle2 className="size-5 text-green-600" aria-hidden="true" />}
          {message && <p role="status" className={`text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground sm:ml-auto">
            <a href={`mailto:${email}`} className="inline-flex items-center gap-1 hover:text-foreground">
              {email} <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href={`tel:${phone}`} className="inline-flex items-center gap-1 hover:text-foreground">
              <Phone className="size-4" aria-hidden="true" /> {phone}
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </div>
      </form>
    </section>
  );
}