<h1 align="center">~/harsh.gajjar</h1>

<p align="center">
  <img alt="Top language" src="https://img.shields.io/github/languages/top/harshhh28/portfolio?color=4ade80">
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/harshhh28/portfolio?color=4ade80">
  <img alt="License" src="https://img.shields.io/github/license/harshhh28/portfolio?color=4ade80">
</p>

<p align="center">
  <a href="#about">About</a> &#xa0;|&#xa0;
  <a href="#features">Features</a> &#xa0;|&#xa0;
  <a href="#easter-eggs">Easter Eggs</a> &#xa0;|&#xa0;
  <a href="#stack">Stack</a> &#xa0;|&#xa0;
  <a href="#setup">Setup</a> &#xa0;|&#xa0;
  <a href="#license">License</a>
</p>

<br>

## About

Personal portfolio styled as a terminal OS: dark, monospace, and a little cheeky. Built with **Next.js 15** and **TypeScript**. Kernel version: `2026.1.0-HG`.

## Features

| Route | What's there |
|---|---|
| `/` | System explorer: overview, skills, experience, education, community |
| `/workbench` | Projects with live links and tech stacks |
| `/logs` | Technical blog (MDX-based) |
| `/contact` | Contact form → Resend (Email) |

**Interactive:**
- **Boot sequence**: typewriter animation on first visit, never repeats
- **Command bar**: press `/` to open an in-page terminal with actual commands
- **Animated CPU load**: spikes to `CRITICAL: 100%` every 8s on the home screen
- **Modules table**: all skills with `VERSION`, `STATUS`, and a one-liner description
- **Kernel panic 404**: stack trace, blame the intern, press any key to go home
- **Fully responsive**: command bar is a bottom sheet on mobile, centered modal on desktop

## Easter Eggs

| Trigger | Effect |
|---|---|
| First visit (fresh `localStorage`) | Boot sequence plays |
| Press `/` anywhere | In-page terminal opens |
| `sudo play` in the terminal | 🤫 |
| Any unknown URL | Kernel panic `0x404` |

## Stack

- [Next.js 15](https://nextjs.org/): App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [MDX](https://mdxjs.com/): technical blog
- [Resend](https://resend.com/): contact form delivery
- [Vercel Analytics](https://vercel.com/analytics)

## Setup

**Prerequisites:** Node.js `v18.17+`, npm, Git.

```bash
git clone https://github.com/harshhh28/portfolio
cd portfolio
npm install
npm run dev
# → http://localhost:3000
```

**Environment variables** — create `.env` at the root:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
EMAIL_RECIPIENT=your_email@example.com
```

**Resend:**
1. Create a [Resend](https://resend.com) account.
2. Generate an API key.
3. Add your verified domain or use the default `onboarding@resend.dev` for testing.

> [!TIP]
> To replay the boot sequence: open devtools → Console → `localStorage.removeItem('hg_booted')` → refresh.

## License

MIT: see [LICENSE](LICENSE).

Made with ❤️ by <a href="https://github.com/harshhh28" target="_blank">Harsh Gajjar</a>

<a href="#top">↑ Back to top</a>
