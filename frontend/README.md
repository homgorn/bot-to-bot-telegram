# Bot-to-Bot Telegram Mini App

Telegram Mini App for bot management dashboard.

## Development

```bash
cd frontend
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Telegram Integration

This mini app is designed to run inside Telegram using @tma.js SDK.

### Features

- Dashboard for managing created bots
- AI agent configuration
- Usage statistics
- Settings management

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Then configure the domain in BotFather using `/setdomain` command.