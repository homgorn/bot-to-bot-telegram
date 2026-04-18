# Context Map - Bot-to-Bot Telegram Platform

## Project Overview

**Project Name:** Bot-to-Bot Telegram
**Type:** Multi-Agent AI Platform / Telegram Bot Management System
**Core Functionality:** Платформа для создания мультиагентных AI систем в Telegram с поддержкой Managed Bots, Bot-to-Bot Communication, MCP интеграции и высоконагруженных архитектур.

---

## Directory Structure

```
bot-to-bot-telegram/
├── docs/                      # Documentation (EN + RU)
│   ├── architecture.md        # System architecture
│   ├── managed-bots.md       # Managed Bots API guide
│   ├── bot-to-bot.md         # Bot-to-Bot communication
│   ├── multi-agent.md        # Multi-agent orchestration
│   ├── mcp-integration.md    # MCP integration guide
│   ├── high-load.md          # High load patterns
│   ├── mini-apps.md          # Telegram Mini Apps
│   ├── api-reference.md      # API documentation
│   ├── getting-started.md    # Quick start guide
│   └── roadmap.md            # Development roadmap
├── backend/                   # Backend services
│   └── src/
│       ├── handlers/          # Telegram bot handlers
│       ├── services/          # Business logic
│       ├── api/              # REST API
│       ├── middleware/       # Custom middleware
│       └── types/            # TypeScript types
├── frontend/                 # Dashboard / Mini App
│   └── src/
│       ├── components/       # React components
│       ├── pages/            # Dashboard pages
│       ├── hooks/            # Custom hooks
│       ├── stores/           # State management
│       └── api/              # API client
├── examples/                  # Code examples
│   ├── managed-bots/         # Managed Bots examples
│   ├── multi-agent/          # Multi-agent examples
│   └── mcp/                  # MCP examples
├── docker/                    # Docker configurations
├── config/                    # Config files
└── docs/ru/                   # Russian documentation
```

---

## SEO Keywords

### Primary Keywords (English)
- Telegram Managed Bots
- Bot-to-Bot Telegram
- Multi-Agent AI Telegram
- Telegram Bot API 9.6
- MCP Model Context Protocol
- Telegram Mini Apps
- Telegram Bot Development
- AI Agent Orchestration
- High Load Telegram Bot
- Telegram Bot Scalability

### Primary Keywords (Russian)
- Управляемые боты Telegram
- Бот-бот коммуникация Telegram
- Мультиагентные AI системы
- Telegram Bot API
- MCP интеграция
- Мини-приложения Telegram
- Разработка Telegram ботов
- Оркестрация AI агентов
- Высокие нагрузки Telegram
- Масштабирование ботов

### Long-tail Keywords
- Telegram managed bots create programmatically
- Bot to bot communication Telegram groups
- Multi-agent AI orchestration Telegram
- Telegram Bot API high load architecture
- Model Context Protocol Telegram integration
- Telegram Mini Apps dashboard development
- aiogram MCP integration
- Telegraf multi-agent system
- Telegram bot rate limiting optimization
- Telegram managed bots scalability

---

## Content Strategy

### Documentation Languages
- **Primary:** English (EN)
- **Secondary:** Russian (RU)
- **Location:** `docs/` (EN), `docs/ru/` (RU)

### Documentation Types
1. **Guides** - Step-by-step tutorials
2. **References** - API documentation
3. **Architectures** - System design
4. **Examples** - Code samples
5. **Best Practices** - Recommendations

---

## GitHub Pages Structure

Base URL: `https://homgorn.github.io/bot-to-bot-telegram/`

### Pages Structure
- `/` - Main README
- `/docs/` - Documentation index
- `/docs/architecture` - Architecture guide
- `/docs/managed-bots` - Managed Bots guide
- `/docs/bot-to-bot` - Bot-to-Bot communication
- `/docs/multi-agent` - Multi-agent systems
- `/docs/mcp` - MCP integration
- `/docs/high-load` - High load patterns
- `/docs/mini-apps` - Mini Apps guide
- `/docs/api` - API reference
- `/examples/` - Code examples
- `/ru/` - Russian version

---

## Implementation Notes

### Chunk System
- Each feature implemented in separate chunk
- Context preserved via this file
- Files created in logical order

### Priority Order
1. Context Map (this file)
2. README (EN + RU)
3. Core documentation
4. Code examples
5. GitHub Pages configuration

---

**Last Updated:** 2026-04-18
**Version:** 1.0.0