---
title: Bot-to-Bot Telegram - Multi-Agent AI Platform
description: Create multi-agent AI systems in Telegram with Managed Bots, Bot-to-Bot Communication, MCP Integration, and High-Load Architecture. Complete documentation and guides.
head:
  - - meta
    - name: keywords
      content: Telegram Managed Bots, Bot-to-Bot Communication, Multi-Agent AI, MCP Integration, Telegram Bot API, AI Agent Platform, Telegram Mini Apps, High Load Telegram Bot
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Bot-to-Bot Telegram - Multi-Agent AI Platform
  - - meta
    - property: og:description
      content: Create multi-agent AI systems in Telegram with Managed Bots, Bot-to-Bot Communication, MCP Integration
  - - meta
    - property: og:url
      content: https://homgorn.github.io/bot-to-bot-telegram/
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"WebSite","name":"Bot-to-Bot Telegram","description":"Multi-Agent AI Platform for Telegram with Managed Bots, Bot-to-Bot Communication, MCP Integration","url":"https://homgorn.github.io/bot-to-bot-telegram/","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"},"potentialAction":{"@type":"SearchAction","target":"https://homgorn.github.io/bot-to-bot-telegram/docs/search?q={search_term_string}","query-input":"required name=search_term_string"}}'
---

<div class="hero">
  <h1>🤖 Bot-to-Bot Telegram</h1>
  <p class="tagline">Multi-Agent AI Platform for Telegram</p>
  
  <div class="badges">
    <a href="https://core.telegram.org/bots/api">
      <img src="https://img.shields.io/badge/Telegram%20Bot%20API-9.6-blue" alt="Telegram Bot API 9.6">
    </a>
    <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
    <img src="https://img.shields.io/badge/Platform-Telegram-yellow" alt="Telegram">
    <img src="https://img.shields.io/badge/AI%20Agents-MCP%20Ready-purple" alt="MCP Ready">
  </div>
</div>

## What is Bot-to-Bot Telegram?

**Bot-to-Bot Telegram** is a comprehensive platform for building and managing multi-agent AI systems within Telegram. It enables developers to create sophisticated bot-to-bot communication systems, orchestrate multiple AI agents, integrate with Model Context Protocol (MCP), and build scalable high-load applications.

### Key Features

| Feature | Description |
|---------|-------------|
| [Managed Bots](/docs/managed-bots) | Programmatically create and manage Telegram bots |
| [Bot-to-Bot Communication](/docs/bot-to-bot) | Inter-bot messaging in groups and via Business Accounts |
| [Multi-Agent Orchestration](/docs/multi-agent) | Coordinate multiple AI agents for complex tasks |
| [MCP Integration](/docs/mcp-integration) | Connect AI models via Model Context Protocol |
| [Telegram Mini Apps](/docs/mini-apps) | Build full-featured web applications within Telegram |
| [High-Load Architecture](/docs/high-load) | Scale to handle millions of messages |

---

## Quick Links

### 📖 Documentation

- [Getting Started](/docs/getting-started) - Begin your journey
- [Managed Bots Guide](/docs/managed-bots) - Full API documentation
- [Bot-to-Bot Communication](/docs/bot-to-bot) - Inter-bot messaging
- [Multi-Agent Systems](/docs/multi-agent) - Agent orchestration
- [MCP Integration](/docs/mcp-integration) - AI model connections
- [High-Load Patterns](/docs/high-load) - Scalability strategies

### ❓ Help

- [FAQ](/docs/faq) - Frequently asked questions
- [How-To Guides](/docs/howto) - Step-by-step tutorials

### 🔗 Resources

- [GitHub Repository](https://github.com/homgorn/bot-to-bot-telegram)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Model Context Protocol](https://modelcontextprotocol.io)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        TELEGRAM PLATFORM                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  User Bot 1 │  │  User Bot 2 │  │  User Bot N │              │
│  │  (Managed)  │  │  (Managed)  │  │  (Managed)  │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│               ┌──────────────────────┐                           │
│               │   Manager Bot (Core) │                           │
│               │  ┌──────────────────┐  │                           │
│               │  │ Bot Factory      │  │                           │
│               │  │ Token Manager   │  │                           │
│               │  │ User Manager     │  │                           │
│               │  │ API Gateway      │  │                           │
│               │  └──────────────────┘  │                           │
│               └──────────┬───────────┘                           │
│                          │                                        │
│         ┌────────────────┼────────────────┐                     │
│         ▼                ▼                ▼                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ AI Agents   │  │  Database   │  │   Redis     │              │
│  │  (MCP)      │  │ PostgreSQL  │  │  Cache/Q    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
cp .env.example .env
# Edit .env with your bot token
```

### Step 4: Enable Managed Bots in BotFather

1. Open @BotFather
2. Select your bot
3. Go to **Bot Settings** → **Bot Management Mode**
4. Enable "Bot Management Mode"

### Step 5: Run the Bot

```bash
npm run dev
```

---

## Use Cases

### AI Agent Platform

Create a platform where users can create their own AI agents with custom prompts and capabilities.

### Business Bot Marketplace

Build a marketplace where users can browse and install pre-built bots for various purposes.

### Multi-Agent Workflows

Orchestrate multiple specialized AI agents that work together on complex tasks.

### Interactive Games

Create Telegram games with multiple bot agents managing game state and player interactions.

---

::: info Contributing
We welcome contributions! See [GitHub](https://github.com/homgorn/bot-to-bot-telegram) for details.
:::