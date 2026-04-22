<h1 align="center">~/harsh.gajjar — Personal OS Portfolio</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/harshhh28/portfolio?color=4ade80">
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/harshhh28/portfolio?color=4ade80">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/harshhh28/portfolio?color=4ade80">
  <img alt="License" src="https://img.shields.io/github/license/harshhh28/portfolio?color=4ade80">
</p>

<p align="center">
  <a href="#about">About</a> &#xa0; | &#xa0;
  <a href="#features">Features</a> &#xa0; | &#xa0;
  <a href="#easter-eggs">Easter Eggs</a> &#xa0; | &#xa0;
  <a href="#technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#starting">Starting</a> &#xa0; | &#xa0;
  <a href="#license">License</a>
</p>

<br>

## About

A personal portfolio styled as a terminal-based OS — dark, minimal, and intentionally a little cheeky. Built with **Next.js 15** and **TypeScript**. Showcases work experience, skills, projects, and blog posts in a system-explorer UI. Kernel version: `2026.1.0-HG`.

## Features

:heavy_check_mark: **Terminal OS UI** — system explorer with sidebar navigation (`/system`)\
:heavy_check_mark: **Projects workbench** — projects page with live links and tech stacks (`/workbench`)\
:heavy_check_mark: **Blog / logs** — technical blog powered by the Hashnode API (`/logs`)\
:heavy_check_mark: **Contact** — contact form with Discord webhook notification (`/contact`)\
:heavy_check_mark: **Boot sequence** — typewriter-style terminal boot animation on first visit\
:heavy_check_mark: **Global command bar** — press `/` anywhere to open an in-page terminal\
:heavy_check_mark: **Easter eggs** — including a certain unforgettable surprise hidden in the command bar\
:heavy_check_mark: **Animated status fields** — CPU load, mood, and other live system stats on the home page\
:heavy_check_mark: **Kernel panic 404** — full stack-trace styled 404 error page\
:heavy_check_mark: **Modules table** — skills rendered as a system module table with VERSION and STATUS columns\
:heavy_check_mark: **Fully responsive** — command bar adapts to mobile (bottom sheet) and desktop (centered modal)

## Easter Eggs

| Trigger | What happens |
|---|---|
| First page load (localStorage cleared) | Boot sequence plays with a typewriter effect |
| Press `/` anywhere on the page | Opens the in-page terminal |
| Type `sudo play` in the terminal | 🤫 |
| Navigate to a non-existent route | Kernel panic `0x404` page with a stack trace |

## Technologies

- [Next.js 15](https://nextjs.org/) — App Router, Server + Client Components
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Hashnode API](https://apidocs.hashnode.com/) — blog content
- [Discord Webhook](https://discord.com/developers/docs/resources/webhook) — contact form notifications
- [Vercel Analytics](https://vercel.com/analytics)

## Requirements

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) `v18.17+`
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Discord server with a webhook (for contact form)
- A Hashnode account with an API token (for blog posts)

## Environment Variables

Create a `.env` file at the project root:

```env
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your_discord_webhook_url
HASHNODE_TOKEN=your_hashnode_api_token
```

**Discord webhook:**
1. Open your Discord server → Server Settings → Integrations → Webhooks
2. Create a webhook and copy the URL

**Hashnode token:**
1. Log in to [Hashnode](https://hashnode.com)
2. Account Settings → Developer Settings → Generate access token

## Starting

```bash
# Clone
git clone https://github.com/harshhh28/portfolio

# Navigate
cd portfolio

# Install
npm install

# Run dev server
npm run dev
# → http://localhost:3000
```

> [!TIP]
> Clear `localStorage` in your browser devtools (`localStorage.removeItem('hg_booted')`) to replay the boot sequence.

## License

MIT — see [LICENSE](LICENSE).

Made with `:terminal:` by <a href="https://github.com/harshhh28" target="_blank">Harsh Gajjar</a>

<a href="#top">↑ Back to top</a>
