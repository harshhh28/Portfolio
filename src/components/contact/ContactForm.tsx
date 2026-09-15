"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/data/socials";

const LIMITS = { name: 100, email: 254, message: 5000 };

const fieldClass =
  "w-full border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-faint outline-none transition-colors hover:border-muted-foreground/40 focus:border-primary";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    error: "",
  });

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFormData((prev) => ({ ...prev, error: "" }));

    const formDataObj = new FormData(e.target as HTMLFormElement);
    const payload = {
      name: formDataObj.get("name") as string,
      email: formDataObj.get("email") as string,
      message: formDataObj.get("message") as string,
      company: formDataObj.get("company") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsMessageSent(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        error: "",
      });
      setTimeout(() => {
        setIsMessageSent(false);
      }, 3000);
    } catch (err) {
      console.error("Error sending message:", err);
      setFormData((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to send message. Please try again later.",
      }));
    } finally {
      setIsSending(false);
    }
  };

  const linkedIn = SOCIALS.find((s) => s.name === "LinkedIn");
  const github = SOCIALS.find((s) => s.name === "GitHub");

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-20">
      <header className="pb-8 pt-14">
        <h1 className="text-[17px] font-semibold">Contact</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Best reached here. I usually reply within a day.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="max-w-md space-y-5">
        <p className="text-xs text-muted-foreground">All fields are required.</p>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={fieldClass}
            required
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={fieldClass}
            required
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            maxLength={LIMITS.message}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={cn(fieldClass, "min-h-[150px] resize-y")}
            required
            placeholder="What's on your mind?"
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <span
            role="status"
            aria-live="polite"
            className={cn(
              "text-xs",
              formData.error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {formData.error
              ? `Error: ${formData.error}`
              : isMessageSent
                ? "Message sent. Thank you."
                : ""}
          </span>

          <button
            type="submit"
            className="shrink-0 bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSending || isMessageSent}
          >
            {isMessageSent ? "Sent" : isSending ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>

      {(linkedIn || github) && (
        <p className="mt-12 max-w-md border-t border-border pt-6 text-sm text-muted-foreground">
          Prefer something else? Find me on{" "}
          {linkedIn && (
            <a
              href={linkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              LinkedIn
            </a>
          )}
          {linkedIn && github && " or "}
          {github && (
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              GitHub
            </a>
          )}
          .
        </p>
      )}
    </div>
  );
};
