"use client";

import React, { useState } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const MailPage = () => {
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
      <div className="w-full max-w-2xl bg-background border border-border shadow-none">
        {/* Window Header */}
        <div className="bg-secondary/30 px-3 py-2 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Terminal size={14} className="text-muted-foreground" />
             <span className="text-xs font-mono font-bold text-muted-foreground uppercase">/bin/mail</span>
          </div>
          <div className="flex gap-2 text-[10px] font-mono text-muted-foreground">
             <span>--compose</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col font-mono text-sm">
          {/* To Field */}
          <div className="flex items-center px-4 py-3 border-b border-border">
            <span className="text-muted-foreground w-20">To:</span>
            <div className="text-foreground">
              me@harshgajjar.dev
            </div>
          </div>

          {/* From/Email Field */}
          <div className="flex items-center px-4 py-3 border-b border-border">
            <label htmlFor="email" className="text-muted-foreground w-20">From:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/30"
              required
              placeholder="user@domain.com"
            />
          </div>

          {/* Subject/Name Field */}
          <div className="flex items-center px-4 py-3 border-b border-border">
            <label htmlFor="name" className="text-muted-foreground w-20">Subject:</label>
             <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/30"
              required
              placeholder="Connection Request / Inquiry"
            />
          </div>

          {/* Message Body */}
          <div className="p-4 flex-1 bg-background">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full min-h-[300px] bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground/30 leading-relaxed font-mono"
              required
              placeholder="> Type your message here..."
            />
          </div>

          {/* Footer / Send Action */}
          <div className="px-4 py-3 bg-secondary/30 border-t border-border flex justify-between items-center">
            {formData.error ? (
               <span className="text-destructive text-xs">Error: {formData.error}</span>
            ) : (
                <span className="text-muted-foreground text-xs">{isMessageSent ? "Message queued for delivery." : "Ready to send."}</span>
            )}
            
            <button
              type="submit"
              className={cn(
                  "px-4 py-1.5 border border-border bg-background hover:bg-secondary/50 text-xs font-mono uppercase transition-colors flex items-center gap-2",
                  isMessageSent && "border-green-500/50 text-green-500",
                  isSending && "opacity-50 cursor-wait"
              )}
              disabled={isSending || isMessageSent}>
              {isMessageSent ? (
                 "SENT"
              ) : (
                <>
                  {isSending ? (
                      "SENDING..."
                  ) : (
                      <>
                        <span>[ SEND ]</span>
                      </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailPage;
