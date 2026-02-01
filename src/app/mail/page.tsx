import { MailClient } from "@/components/mail/MailClient";

export const metadata = {
  title: "Mail | Harsh Gajjar",
  description: "Send me a message directly from the terminal.",
};

export default function MailPage() {
  return <MailClient />;
}
