import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Harsh Gajjar",
  description: "Send me a message directly from the terminal.",
  openGraph: {
    title: "Contact | Harsh Gajjar",
    description: "Send me a message directly from the terminal.",
    url: "https://harshgajjar.dev/contact",
    siteName: "Harsh Gajjar",
    images: [
      {
        url: "https://harshgajjar.dev/assets/images/og/contact.webp",
        width: 1200,
        height: 630,
        alt: "Contact | Harsh Gajjar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Harsh Gajjar",
    description: "Send me a message directly from the terminal.",
    images: ["https://harshgajjar.dev/assets/images/og/contact.webp"],
    creator: "@harshgajjar_28",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
