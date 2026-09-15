import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { baseOpenGraph } from "@/lib/site";

const description = "Get in touch with Harsh Gajjar.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { ...baseOpenGraph, url: "/contact", title: "Contact | Harsh Gajjar", description },
};

export default function ContactPage() {
  return <ContactForm />;
}
