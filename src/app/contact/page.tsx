"use client";

import React, { useEffect, useState } from "react";
import { Send, ArrowLeft } from "react-feather";
import { useWebhook } from "../../hooks/useWebhook";
import Loader from "@/components/Loader";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    error: "",
  });

  const { sendWebhook, error } = useWebhook();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      content: `New contact form submission:\nName: ${formData.get(
        "name"
      )}\nEmail: ${formData.get("email")}\nMessage: ${formData.get("message")}`,
    };

    try {
      await sendWebhook(payload);
      setIsMessageSent(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        error: "",
      });
      setTimeout(() => {
        setIsMessageSent(false);
      }, 2000); // Match the rocket animation duration
    } catch (err) {
      console.error("Error sending message:", err);
      setFormData((prev) => ({
        ...prev,
        error: "Error occurred :(",
      }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-6 sm:p-8 form-container">
          <div className="form-element mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base text-white/60 mb-6">
              Have a question or want to work together? Let's connect!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-element">
              <label
                htmlFor="name"
                className="block text-sm sm:text-base font-medium mb-2 text-white/80">
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
                className="glass-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-element">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium mb-2 text-white/80">
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
                className="glass-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-element">
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium mb-2 text-white/80">
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
                className="glass-input w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base resize-none"
                required
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              className={`form-element submit-button w-full px-4 sm:px-6 py-2 sm:py-3 bg-white/10 
                border border-white/20 rounded-lg font-medium flex items-center justify-center gap-2
                ${isMessageSent ? "bg-green-900/50" : "hover:bg-white/15"}
                transition-all duration-300`}
              disabled={isLoading}>
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
                  <Send size={18} className={isLoading ? "animate-spin" : ""} />
                  {isLoading ? "Sending..." : "Send Message"}
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
