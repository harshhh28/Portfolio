"use client";

import React, { useState } from "react";
import { Send } from "react-feather";
import { cn } from "@/lib/utils";

const ContactPage = () => {
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

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg">
            Have a question or want to work together? Let's connect!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all"
              required
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all"
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={5}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all resize-none"
              required
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className={cn(
                "w-full px-4 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-colors",
                isMessageSent 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-primary text-primary-foreground hover:opacity-90",
                isSending && "opacity-70 cursor-not-allowed"
            )}
            disabled={isSending || isMessageSent}>
            {isMessageSent ? (
               "Message Sent!"
            ) : (
              <>
                <Send size={18} className={isSending ? "animate-spin" : ""} />
                {isSending ? "Sending..." : "Send Message"}
              </>
            )}
          </button>

          {formData.error && (
            <div
              className="text-destructive text-sm text-center">
              {formData.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
