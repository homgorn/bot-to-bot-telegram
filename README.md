# 🤖 Bot-to-Bot Telegram - Multi-Agent AI Platform

**Multi-Agent AI Platform for Telegram with Managed Bots, Bot-to-Bot Communication, MCP Integration, and High-Load Architecture**

[![Telegram Bot API](https://img.shields.io/badge/Telegram%20Bot%20API-9.6-blue)](https://core.telegram.org/bots/api)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Telegram-yellow)](https://telegram.org/)
[![AI Agents](https://img.shields.io/badge/AI%20Agents-MCP%20Ready-purple)](https://modelcontextprotocol.io)

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Key Technologies](#key-technologies)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Examples](#examples)
- [Use Cases](#use-cases)
- [SEO Keywords](#seo-keywords)
- [Contributing](#contributing)
- [License](#license)

---

## Description

### English

**Bot-to-Bot Telegram** is a comprehensive platform for building and managing multi-agent AI systems within Telegram. This platform enables developers to create sophisticated bot-to-bot communication systems, orchestrate multiple AI agents, integrate with Model Context Protocol (MCP), and build scalable high-load applications.

The platform leverages Telegram's Managed Bots feature (introduced in Bot API 9.6, April 2026) allowing users to create and manage their own bots programmatically. Combined with Bot-to-Bot Communication Mode and MCP integration, this enables complex agentic workflows and AI-powered use cases.

Key capabilities include:
- **Managed Bots** - Programmatically create and manage Telegram bots
- **Bot-to-Bot Communication** - Inter-bot messaging in groups and via Business Accounts
- **Multi-Agent Orchestration** - Coordinate multiple AI agents for complex tasks
- **MCP Integration** - Connect AI models via Model Context Protocol
- **Telegram Mini Apps** - Build full-featured web applications within Telegram
- **High-Load Architecture** - Scale to handle millions of messages

### Русский

**Bot-to-Bot Telegram** — это комплексная платформа для создания и управления мультиагентными AI системами в Telegram. Платформа позволяет разработчикам создавать сложные системы межботовой коммуникации, оркестрировать несколько AI агентов, интегрироваться с Model Context Protocol (MCP) и создавать масштабируемые высоконагруженные приложения.

Платформа использует функцию Managed Bots (Telegram Bot API 9.6, апрель 2026), позволяющую пользователям программно создавать и управлять своими ботами. В сочетании с режимом Bot-to-Bot Communication и интеграцией с MCP это обеспечивает сложные агентные рабочие процессы и AI- powered сценарии использования.

Основные возможности:
- **Managed Bots** - Программное создание и управление ботами Telegram
- **Bot-to-Bot Communication** - Межботовое общение в группах и через Business Accounts
- **Multi-Agent Orchestration** - Координация нескольких AI агентов для сложных задач
- **MCP Integration** - Подключение AI моделей через Model Context Protocol
- **Telegram Mini Apps** - Создание полнофункциональных веб-приложений в Telegram
- **High-Load Architecture** - Масштабирование для обработки миллионов сообщений

---

## Features

### H2: Core Features

#### H3: Managed Bots System

- **Programmatic Bot Creation** - Create bots via API without manual BotFather interaction
- **Bot Lifecycle Management** - Full control over bot creation, configuration, and deletion
- **Token Management** - Secure storage and retrieval of bot tokens via `getManagedBotToken`
- **User Bot Spawning** - Allow users to spin up personal AI agents, business bots, games
- **Bot Templates** - Pre-configured bot templates for common use cases

#### H3: Bot-to-Bot Communication

- **Group Chat Communication** - Bots can interact within same group via commands and replies
- **Admin Rights Mode** - Receive all messages from other bots with admin privileges
- **Privacy Mode Control** - Disable Group Privacy to receive all group messages
- **Business Account Integration** - Send messages between bots via connected business accounts
- **Loop Prevention** - Implement safeguards against infinite interaction loops

#### H3: Multi-Agent AI Orchestration

- **Agent Coordination** - Orchestrate multiple AI agents working together
- **Task Delegation** - Split complex tasks across specialized agents
- **State Sharing** - Share context and state between agents
- **Role-Based Agents** - Define agents with specific responsibilities
- **Hierarchical Structure** - Create agent hierarchies for complex workflows

#### H3: MCP Integration

- **Model Context Protocol** - Connect to AI models via MCP standard
- **Tool Discovery** - Automatic discovery of available tools and capabilities
- **Resource Access** - Provide AI agents access to resources and data
- **Prompt Templates** - Pre-built prompts for common workflows
- **Real-Time Events** - Push Telegram events to AI agents via MCP

#### H3: Telegram Mini Apps

- **Full-Screen Apps** - Create immersive full-screen experiences
- **Native Integration** - Access Telegram SDK for native features
- **Secure Authentication** - Validate user via initData HMAC-SHA256
- **Payments** - Integrate Telegram Payments with Stripe
- **Theme Integration** - Automatically match Telegram theme

#### H3: High-Load Architecture

- **Horizontal Scaling** - Scale across multiple instances
- **Rate Limiting** - Implement token bucket for 30 msg/s limit
- **Queue Management** - Handle message bursts with queues
- **Retry Logic** - Exponential backoff with jitter
- **Health Monitoring** - Real-time health and metrics

---

## Key Technologies

### H2: Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Telegram Bot API | Core bot functionality | 9.6 (April 2026) |
| aiogram | Python bot framework | 3.x |
| Telegraf | Node.js bot framework | 4.x |
| grammY | TypeScript bot framework | Latest |
| MCP | AI model integration | Latest |
| React | Frontend UI | 18.x |
| TypeScript | Type safety | 5.x |
| Docker | Containerization | Latest |
| PostgreSQL | Database | 15.x |
| Redis | Caching & queues | 7.x |

---

## Architecture

### H2: System Architecture

#### H3: High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Telegram Platform                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ User Bot 1  │  │ User Bot 2  │  │ User Bot N  │              │
│  │  (Managed)  │  │  (Managed)  │  │  (Managed)  │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│               ┌──────────────────────┐                           │
│               │   Manager Bot (Core)  │                           │
│               │   - Bot Management    │                           │
│               │   - User Auth         │                           │
│               │   - API Gateway       │                           │
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

#### H3: Component Architecture

##### H4: Manager Bot Layer

- **Bot Factory** - Creates and configures new managed bots
- **Token Manager** - Stores and retrieves bot tokens securely
- **User Manager** - Manages user permissions and bot assignments
- **API Gateway** - Routes requests to appropriate services

##### H4: Agent Orchestration Layer

- **Agent Registry** - Maintains list of available AI agents
- **Task Queue** - Manages pending tasks across agents
- **State Store** - Shares context between agents
- **Event Bus** - Distributes events to interested agents

##### H4: Infrastructure Layer

- **Message Broker** - Handles async message processing
- **Rate Limiter** - Enforces Telegram API limits
- **Health Checker** - Monitors system health
- **Metrics Collector** - Gathers performance metrics

---

## Getting Started

### H2: Quick Start Guide

#### H3: Prerequisites

- Node.js 18+ or Python 3.10+
- Telegram Bot Token (from @BotFather)
- Docker (optional, for production)
- PostgreSQL 15+ (for production)
- Redis 7+ (for production)

#### H3: Installation

##### H4: Clone Repository

```bash
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram
```

##### H4: Install Dependencies

**Node.js:**
```bash
npm install
```

**Python:**
```bash
pip install -r requirements.txt
```

##### H4: Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_bot_token
MANAGER_BOT_USERNAME=YourManagerBot

# Database (Production)
DATABASE_URL=postgresql://user:pass@localhost:5432/botdb
REDIS_URL=redis://localhost:6379

# MCP Configuration
MCP_SERVER_URL=http://localhost:3000

# Security
SECRET_KEY=your_secret_key
```

##### H4: Run Development Server

**Node.js:**
```bash
npm run dev
```

**Python:**
```bash
python main.py
```

#### H3: Enable Managed Bots Mode

1. Open @BotFather
2. Select your bot
3. Go to Bot Settings → Bot Management Mode
4. Enable "Bot Management Mode"
5. Copy the manager bot username

#### H3: Test Basic Functionality

Send `/start` to your bot - you should receive a welcome message with instructions.

---

## Documentation

### H2: Documentation Structure

#### H3: English Documentation

| Document | Description | Link |
|----------|-------------|------|
| Architecture | System architecture and design patterns | [docs/architecture.md](docs/architecture.md) |
| Managed Bots | Complete Managed Bots API guide | [docs/managed-bots.md](docs/managed-bots.md) |
| Bot-to-Bot | Inter-bot communication guide | [docs/bot-to-bot.md](docs/bot-to-bot.md) |
| Multi-Agent | AI agent orchestration guide | [docs/multi-agent.md](docs/multi-agent.md) |
| MCP Integration | Model Context Protocol setup | [docs/mcp-integration.md](docs/mcp-integration.md) |
| High-Load | Scalability patterns | [docs/high-load.md](docs/high-load.md) |
| Mini Apps | Telegram Mini Apps development | [docs/mini-apps.md](docs/mini-apps.md) |
| API Reference | REST API documentation | [docs/api-reference.md](docs/api-reference.md) |
| Getting Started | Quick start tutorial | [docs/getting-started.md](docs/getting-started.md) |
| Roadmap | Development roadmap | [docs/roadmap.md](docs/roadmap.md) |

#### H3: Russian Documentation (Документация на русском)

| Document | Description | Link |
|----------|-------------|------|
| Архитектура | Архитектура системы | [docs/ru/architecture.md](docs/ru/architecture.md) |
| Managed Bots | Полное руководство по API | [docs/ru/managed-bots.md](docs/ru/managed-bots.md) |
| Bot-to-Bot | Межботовая коммуникация | [docs/ru/bot-to-bot.md](docs/ru/bot-to-bot.md) |
| Multi-Agent | Оркестрация AI агентов | [docs/ru/multi-agent.md](docs/ru/multi-agent.md) |
| MCP Integration | Настройка MCP | [docs/ru/mcp-integration.md](docs/ru/mcp-integration.md) |
| High-Load | Паттерны масштабирования | [docs/ru/high-load.md](docs/ru/high-load.md) |
| Mini Apps | Разработка Mini Apps | [docs/ru/mini-apps.md](docs/ru/mini-apps.md) |
| API Reference | REST API документация | [docs/ru/api-reference.md](docs/ru/api-reference.md) |
| Getting Started | Быстрый старт | [docs/ru/getting-started.md](docs/ru/getting-started.md) |
| Roadmap | План развития | [docs/ru/roadmap.md](docs/ru/roadmap.md) |

---

## Examples

### H2: Code Examples

#### H3: Managed Bots Examples

```javascript
// Create managed bot link
const botUsername = 'ManagerBot';
const newUsername = 'MyNewAIBot';
const newName = 'My New AI Bot';

const link = `https://t.me/newbot/${botUsername}/${newUsername}?name=${encodeURIComponent(newName)}`;

// Handle managed_bot update
bot.on('managed_bot', async (ctx) => {
  const { managed_bot } = ctx.update;
  const token = await ctx.api.call('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  // Control the new bot
  const newBot = new Telegraf(token);
  newBot.command('start', (ctx) => ctx.reply('Welcome to your new bot!'));
  newBot.launch();
});
```

#### H3: Multi-Agent Example

```javascript
// Agent orchestration
const agents = {
  'researcher': new ResearchAgent(),
  'analyzer': new AnalyzerAgent(),
  'reporter': new ReporterAgent()
};

// Task delegation
async function handleComplexTask(userRequest) {
  const research = await agents.researcher.search(userRequest);
  const analysis = await agents.analyzer.analyze(research);
  return await agents.reporter.format(analysis);
}
```

#### H3: MCP Integration Example

```python
from aiogram import Dispatcher, Bot
from aiogram_mcp import AiogramMCP

bot = Bot(token="BOT_TOKEN")
dp = Dispatcher(bot)

mcp = AiogramMCP(
    bot=bot,
    dp=dp,
    name="my-bot",
    tools=[
        "send_message",
        "edit_message",
        "answer_callback_query"
    ]
)

mcp.run()
```

---

## Use Cases

### H2: Common Use Cases

#### H3: AI Agent Platform

Create a platform where users can create their own AI agents with custom prompts and capabilities. Each user gets their own managed bot that responds using AI models connected via MCP.

#### H3: Business Bot Marketplace

Build a marketplace where users can browse and install pre-built bots for various purposes (customer support, sales, productivity, games). Users can spawn bots with one click.

#### H3: Multi-Agent Workflows

Orchestrate multiple specialized AI agents that work together on complex tasks. For example: research agent finds information, analyst processes it, writer creates content, publisher distributes it.

#### H4: Customer Service System

- **Triage Agent** - Routes incoming queries
- **FAQ Agent** - Answers common questions
- **Escalation Agent** - Handles complex issues
- **Follow-up Agent** - Manages post-support

#### H4: Content Creation Pipeline

- **Research Agent** - Gathers information
- **Writer Agent** - Creates content
- **Editor Agent** - Refines content
- **Publisher Agent** - Distributes content

#### H3: Interactive Games

Create Telegram games where multiple bot agents interact with players, manage game state, and provide dynamic experiences.

#### H3: Productivity Tools

Build productivity suites with multiple agents handling calendar, tasks, notes, and integrations with other services.

---

## SEO Keywords

### H2: SEO-Optimized Keywords

#### H3: Primary Keywords (English)

- Telegram Managed Bots
- Bot-to-Bot Communication Telegram
- Multi-Agent AI Platform
- Telegram Bot API 9.6
- Model Context Protocol Integration
- Telegram Mini Apps Development
- AI Agent Orchestration
- High Load Telegram Bot Architecture
- Telegram Bot Scalability
- MCP Telegram Integration

#### H3: Long-Tail Keywords (English)

- How to create Telegram managed bots programmatically
- Telegram bot-to-bot communication in groups
- Build multi-agent AI system Telegram
- Telegram Bot API high load patterns
- Connect Claude to Telegram via MCP
- Create Telegram Mini App dashboard
- aiogram MCP integration tutorial
- Telegraf multi-agent orchestration
- Telegram bot rate limiting best practices
- Scale Telegram bot to millions users

#### H3: Primary Keywords (Russian)

- Управляемые боты Telegram API
- Межботовая коммуникация Telegram
- Мультиагентная AI платформа
- Telegram Bot API 9.6
- Интеграция Model Context Protocol
- Разработка Telegram Mini Apps
- Оркестрация AI агентов
- Высоконагруженная архитектура Telegram
- Масштабирование Telegram ботов
- MCP интеграция Telegram

#### H3: Long-Tail Keywords (Russian)

- Как программно создать управляемые боты Telegram
- Межботовая коммуникация в группах Telegram
- Создать мультиагентную AI систему в Telegram
- Паттерны высоких нагрузок Telegram Bot API
- Подключить Claude к Telegram через MCP
- Создать дашборд Mini App Telegram
- Интеграция aiogram MCP
- Оркестрация мультиагентов Telegraf
- Ограничение скорости Telegram бот
- Масштабировать Telegram бот до миллионов пользователей

---

## Contributing

### H2: Contributing Guidelines

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

#### H3: Ways to Contribute

- **Documentation** - Improve guides and tutorials
- **Code** - Add features and fix bugs
- **Examples** - Share your implementations
- **Testing** - Help test and validate

#### H3: Development Setup

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/bot-to-bot-telegram.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

---

## License

### H2: License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Resources

### H2: Additional Resources

#### H3: Official Documentation

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Managed Bots Guide](https://core.telegram.org/bots/features#managed-bots)
- [Bot-to-Bot Communication](https://core.telegram.org/bots/features#bot-to-bot-communication)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Model Context Protocol](https://modelcontextprotocol.io)

#### H3: SDKs and Libraries

- [aiogram](https://aiogram.dev/) - Python Telegram Bot API
- [Telegraf](https://telegraf.js.org/) - Node.js Telegram Bot Framework
- [grammY](https://grammy.dev/) - TypeScript Telegram Bot Framework
- [aiogram-mcp](https://pypi.org/project/aiogram-mcp/) - MCP for aiogram
- [@tma.js](https://docs.telegram-mini-apps.com/) - Telegram Mini Apps SDK

#### H3: Community

- [Telegram Bot API Discussions](https://github.com/TelegramBots/Telegram.Bot/issues)
- [AI Agent Communities](https://modelcontextprotocol.io/community)

---

## Changelog

### H2: Version History

#### H3: v1.0.0 (April 2026)

- Initial release
- Managed Bots support
- Bot-to-Bot Communication
- Multi-Agent orchestration
- MCP integration
- High-Load architecture patterns
- Telegram Mini Apps examples

---

## Support

### H2: Get Help

- **Issues** - Report bugs and request features
- **Discussions** - Ask questions and share ideas
- **Documentation** - Read detailed guides

---

**Last Updated:** April 18, 2026
**Version:** 1.0.0
**Platform:** Telegram Bot API 9.6