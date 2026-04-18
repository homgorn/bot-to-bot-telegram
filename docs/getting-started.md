---
title: Getting Started - Bot-to-Bot Telegram Platform
description: Learn how to create multi-agent AI systems in Telegram with Managed Bots, Bot-to-Bot Communication, and MCP Integration. Step-by-step guide for developers.
head:
  - - meta
    - name: keywords
      content: Telegram Managed Bots, Bot-to-Bot Communication, Multi-Agent AI, MCP Integration, Telegram Bot API 9.6, AI Agent Platform, Telegram Mini Apps
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: article:section
      content: Documentation
  - - meta
    - property: article:published_time
      content: 2026-04-18
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Getting Started with Bot-to-Bot Telegram","description":"Learn how to create multi-agent AI systems in Telegram with Managed Bots, Bot-to-Bot Communication, and MCP Integration.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/getting-started","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"},"programmingLanguage":["JavaScript","Python"]}'
---

# Getting Started with Bot-to-Bot Telegram

## Introduction

Welcome to the **Bot-to-Bot Telegram** platform — a comprehensive solution for building multi-agent AI systems within Telegram. This guide will help you understand the platform's capabilities and get started quickly.

### What is Bot-to-Bot Telegram?

Bot-to-Bot Telegram is a platform that enables developers to create sophisticated AI-powered bots with the following capabilities:

- **Managed Bots** - Programmatically create and manage Telegram bots
- **Bot-to-Bot Communication** - Enable inter-bot messaging within groups
- **Multi-Agent Orchestration** - Coordinate multiple AI agents
- **MCP Integration** - Connect to AI models via Model Context Protocol
- **High-Load Architecture** - Scale to handle millions of messages

::: tip Quick Fact
The platform supports **Telegram Bot API 9.6** (April 2026) with full Managed Bots support.
:::

---

## Prerequisites

Before you begin, ensure you have:

| Requirement | Description |
|-------------|-------------|
| Node.js 18+ or Python 3.10+ | Runtime environment |
| Telegram Account | For bot creation |
| @BotFather Access | To create and configure bots |
| Git | For version control |

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram
```

### Step 2: Install Dependencies

```bash
# For Node.js
npm install

# For Python
pip install -r requirements.txt
```

### Step 3: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Telegram bot token:

```env
BOT_TOKEN=your_telegram_bot_token_here
MANAGER_BOT_USERNAME=YourManagerBot
```

---

## Quick Start

### Create Your First Managed Bot

1. **Enable Managed Bots Mode** in @BotFather:
   - Select your bot
   - Go to **Bot Settings** → **Bot Management Mode**
   - Enable "Bot Management Mode"

2. **Run the Manager Bot**:

```bash
npm run dev
```

3. **Share the creation link** with users:

```
https://t.me/newbot/YourBotUsername?name=My+AI+Bot
```

When users open this link, they can create their own bots that you manage!

---

## Core Concepts

### Managed Bots

Managed Bots allow your bot to create other bots programmatically. Each created bot can be customized and controlled via API.

### Bot-to-Bot Communication

Bots can communicate with each other in groups when:
- At least one bot has Bot-to-Bot Mode enabled
- Using command mentions (`/command@OtherBot`) or replies

### Multi-Agent Systems

Orchestrate multiple AI agents that work together:
- **Research Agent** - Gathers information
- **Analyzer Agent** - Processes data
- **Writer Agent** - Creates content
- **Publisher Agent** - Distributes output

---

## Next Steps

Ready to dive deeper? Explore these guides:

| Guide | Description |
|-------|------------|
| [Managed Bots Guide](/managed-bots) | Full API documentation |
| [Bot-to-Bot Communication](/bot-to-bot) | Inter-bot messaging |
| [Multi-Agent Orchestration](/multi-agent) | Agent coordination |
| [MCP Integration](/mcp-integration) | AI model connections |
| [FAQ](/faq) | Common questions |

---

## Support

- **GitHub Issues**: [Report bugs](https://github.com/homgorn/bot-to-bot-telegram/issues)
- **Documentation**: [Full docs](/architecture)
- **Discord**: Join our community

::: info Need Help?
Check our [How-To Guides](/howto) for step-by-step tutorials.
:::