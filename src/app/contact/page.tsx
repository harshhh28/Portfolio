"use client";

import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Send } from "react-feather";
import { useWebhook } from "../../hooks/useWebhook";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { sendWebhook, error } = useWebhook();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      content: `New contact form submission:\nName: ${formData.get(
        "name"
      )}\nEmail: ${formData.get("email")}\nMessage: ${formData.get("message")}`,
    };

    try {
      setLoading(true);
      await sendWebhook(payload);
      setIsMessageSent(true);
      setLoading(false);
      setTimeout(() => {
        setIsMessageSent(false);
      }, 2000); // Match the rocket animation duration
    } catch (err) {
      console.error("Error sending message:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-8 form-container">
          <div className="form-element" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Get in Touch
            </h1>
            <p className="text-white/60 mb-8">
              Have a question or want to work together? Let's connect!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-element" style={{ animationDelay: "0.2s" }}>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-white/80">
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
                className="glass-input w-full"
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-element" style={{ animationDelay: "0.3s" }}>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-white/80">
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
                className="glass-input w-full"
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-element" style={{ animationDelay: "0.4s" }}>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-white/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={6}
                className="glass-input w-full resize-none"
                required
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              className={`form-element submit-button w-full px-6 py-3 bg-white/10 
                border border-white/20 rounded-lg font-medium flex items-center justify-center gap-2
                ${isMessageSent ? "bg-green-900/50" : "hover:bg-white/15"}`}
              style={{ animationDelay: "0.5s" }}
              disabled={loading}>
              {isMessageSent ? (
                <div className="relative">
                  <div className="absolute right-full top-1/2 -translate-y-1/2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="smoke-particle"
                        style={{
                          right: `${i * 3}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    className="transform transition-transform duration-700 animate-rocket text-blue-400 fill-current">
                    <path d="M4 10.4l15-4.4l-4.4 15l-2.6-6.4z" />
                  </svg>
                </div>
              ) : (
                <>
                  <Send size={18} className={loading ? "animate-spin" : ""} />
                  {loading ? "Sending..." : "Send Message"}
                </>
              )}
            </button>

            {error && (
              <div
                className="form-element text-red-400 text-sm mt-2"
                style={{ animationDelay: "0.6s" }}>
                Error: {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
