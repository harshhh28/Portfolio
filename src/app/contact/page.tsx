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
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-card border border-border/50 rounded-xl shadow-xl overflow-hidden">
        {/* Window Header */}
        <div className="bg-muted/50 px-4 py-3 border-b border-border/50 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">New Message</span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* To Field */}
          <div className="flex items-center px-4 py-3 border-b border-border/30">
            <span className="text-muted-foreground text-sm font-medium w-16">To:</span>
            <div className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-sm rounded-md border border-transparent">
              Harsh Gajjar
            </div>
          </div>

          {/* From/Email Field */}
          <div className="flex items-center px-4 py-3 border-b border-border/30">
            <label htmlFor="email" className="text-muted-foreground text-sm font-medium w-16">From:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Subject/Name Field */}
          <div className="flex items-center px-4 py-3 border-b border-border/30">
            <label htmlFor="name" className="text-muted-foreground text-sm font-medium w-16">Subject:</label>
             <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
              required
              placeholder="Regarding..."
            />
          </div>

          {/* Message Body */}
          <div className="p-4 flex-1">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full min-h-[300px] bg-transparent border-none outline-none resize-none text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/40 font-mono"
              required
              placeholder="Hi Harsh, I'd like to talk about..."
            />
          </div>

          {/* Footer / Send Action */}
          <div className="px-4 py-4 bg-muted/20 border-t border-border/30 flex justify-between items-center">
            {formData.error ? (
               <span className="text-destructive text-xs">{formData.error}</span>
            ) : (
                <span className="text-muted-foreground text-xs">markdown supported</span>
            )}
            
            <button
              type="submit"
              className={cn(
                  "px-6 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm",
                  isMessageSent 
                      ? "bg-green-600/90 text-white hover:bg-green-700" 
                      : "bg-primary text-primary-foreground hover:opacity-90",
                  isSending && "opacity-70 cursor-not-allowed"
              )}
              disabled={isSending || isMessageSent}>
              {isMessageSent ? (
                 "Sent!"
              ) : (
                <>
                  {isSending ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                      <Send size={14} />
                  )}
                  {isSending ? "Sending..." : "Send"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
