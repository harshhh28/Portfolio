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
      }, 3000); // Reset the message after 2 seconds
    } catch (err) {
      console.error("Error sending message:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div
          className={`backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-8 animate-in slide-in-from-bottom`}>
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Get in Touch
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2">
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isMessageSent ? "bg-green-900" : ""
              }`}
              disabled={loading}>
              {isMessageSent ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <Send
                  size={20}
                  className={`transition-transform transform ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              )}
              {loading ? (
                "Sending..."
              ) : isMessageSent ? (
                <TypeAnimation
                  sequence={["Message sent successfully!", 4000]}
                  wrapper="span"
                  cursor={false}
                  repeat={0}
                />
              ) : (
                "Send Message"
              )}
              {isMessageSent ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : null}
            </button>
            {error && <p>Error: {error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
