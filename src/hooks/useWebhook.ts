import { useState } from "react";

export const useWebhook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendWebhook = async (payload: any) => {
    setLoading(true);
    setError(null);

    console.log("Sending payload:", payload);

    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL || "";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // console.log("Response status:", response.status);
      // console.log("Response body:", await response.text());

      if (!response.ok) {
        throw new Error("Failed to send webhook");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error sending webhook:", err.message);
      } else {
        setError(String(err));
        console.error("Error sending webhook:", String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendWebhook, loading, error };
};
