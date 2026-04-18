---
title: Installation - Bot-to-Bot Telegram
description: Installation guide for Bot-to-Bot Telegram platform. Step-by-step setup for Node.js, Python, Docker, and cloud deployment.
head:
  - - meta
    - name: keywords
      content: Telegram bot installation, aiogram installation, Telegraf installation, Docker telegram bot, deploy telegram bot, Node.js telegram bot setup, Python telegram bot setup
  - - meta
    - name: robots
      content: index, follow
---

# Installation

Complete installation guide for Bot-to-Bot Telegram platform.

## Requirements

| Component | Minimum Version |
|-----------|-----------------|
| Node.js | 18.x |
| Python | 3.10+ |
| PostgreSQL | 15.x |
| Redis | 7.x |
| Docker | 20.x+ |

---

## Node.js Installation

### Quick Install

```bash
# Clone repository
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Configure Environment

Edit `.env` file:

```env
BOT_TOKEN=your_telegram_bot_token
MANAGER_BOT_USERNAME=YourBotUsername
DATABASE_URL=postgresql://user:pass@localhost:5432/botdb
REDIS_URL=redis://localhost:6379
```

### Run Development

```bash
npm run dev
```

---

## Python Installation

### Using pip

```bash
# Clone repository
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env
```

### Configure and Run

```bash
# Edit .env file
python main.py
```

---

## Docker Installation

### Using Docker Compose

```bash
# Clone and navigate to project
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Start all services
docker-compose up -d
```

### Docker Compose File

```yaml
version: '3.8'

services:
  bot:
    build: .
    ports:
      - "3000:3000"
    environment:
      - BOT_TOKEN=${BOT_TOKEN}
      - DATABASE_URL=postgresql://postgres:password@db:5432/bots
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: bots
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

---

## Cloud Deployment

### Vercel (Serverless)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and init
railway login
railway init

# Deploy
railway up
```

### Render

1. Connect GitHub repository to Render
2. Set environment variables
3. Deploy automatically

---

## Verification

### Test Your Setup

```bash
# Check bot is running
curl https://api.telegram.org/bot<TOKEN>/getMe

# Should return bot info JSON
```

### Health Check

Send `/start` to your bot - you should receive a welcome message.

---

## Next Steps

- [Quick Start Guide](/docs/quick-start)
- [Managed Bots Setup](/docs/managed-bots)
- [Configuration Reference](/docs/api-reference)

---

::: tip Need Help?
Check the [FAQ](/docs/faq) or [How-To Guides](/docs/howto).
:::