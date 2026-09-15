import { SOCIALS } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-xs text-faint">&copy; {year} Harsh Gajjar</p>
        <ul className="flex items-center gap-5">
          {SOCIALS.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                <social.icon size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
