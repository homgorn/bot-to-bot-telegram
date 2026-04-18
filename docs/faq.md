---
title: FAQ - Bot-to-Bot Telegram
description: Frequently asked questions about Bot-to-Bot Telegram platform, Managed Bots, Bot-to-Bot Communication, MCP Integration, and Telegram bot development.
head:
  - - meta
    - name: keywords
      content: Telegram FAQ, Managed Bots FAQ, Bot-to-Bot FAQ, MCP FAQ, Telegram bot questions, AI agent questions, Telegram Mini Apps FAQ
  - - meta
    - name: robots
      content: index, follow
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"FAQPage","headline":"Bot-to-Bot Telegram FAQ","description":"Frequently asked questions about Bot-to-Bot Telegram platform, Managed Bots, and AI agent integration.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/faq","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"}}'
---

# Frequently Asked Questions (FAQ)

## General Questions

### What is Bot-to-Bot Telegram?

**Bot-to-Bot Telegram** is a platform for creating multi-agent AI systems in Telegram. It enables developers to build sophisticated bots with Managed Bots, inter-bot communication, and AI integration via MCP (Model Context Protocol).

### What is Telegram Managed Bots?

Managed Bots is a feature in **Telegram Bot API 9.6** that allows your bot to create and manage other bots programmatically. Users can create their own bots through special links without using @BotFather directly.

### What is Bot-to-Bot Communication?

Bot-to-Bot Communication allows bots to interact with each other in:
- **Group chats** - via command mentions or replies
- **Business Accounts** - via connected business accounts

At least one bot must have Bot-to-Bot Mode enabled for this to work.

---

## Technical Questions

### How do I enable Managed Bots?

1. Open @BotFather
2. Select your bot
3. Go to **Bot Settings** → **Bot Management Mode**
4. Enable "Bot Management Mode"

### How do I enable Bot-to-Bot Communication?

1. Open @BotFather
2. Select your bot
3. Go to **Bot Settings** → **Bot-to-Bot Communication**
4. Enable "Bot-to-Bot Communication Mode"

### What languages/frameworks are supported?

| Language | Framework | Status |
|----------|-----------|--------|
| JavaScript/TypeScript | Telegraf | ✅ Supported |
| JavaScript/TypeScript | grammY | ✅ Supported |
| Python | aiogram | ✅ Supported |
| Python | python-telegram-bot | ✅ Supported |

### What is MCP (Model Context Protocol)?

MCP is an open standard for connecting AI models to tools and services. It enables your Telegram bots to interact with AI models like Claude, GPT, and others.

---

## Pricing & Limits

### What are the rate limits?

Telegram Bot API has these limits:
- **30 messages/second** per chat
- **Global limits** - varies by method
- **429 errors** indicate rate limiting

See our [High-Load Architecture](/high-load) guide for optimization strategies.

### Is the platform free?

The platform itself is open-source (MIT license). However:
- You need a Telegram bot token (free from @BotFather)
- Hosting costs depend on your infrastructure
- AI providers (OpenAI, Claude) have their own pricing

---

## Troubleshooting

### My bot isn't receiving messages from other bots

Check these settings:
1. Bot-to-Bot Mode is enabled in @BotFather
2. The sending bot mentioned yours or replied
3. Your bot has admin rights OR disabled Group Privacy

### I'm getting 429 errors

This is a rate limit. Implement:
- Token bucket algorithm
- Exponential backoff
- Message queuing

See [High-Load Architecture](/high-load) for details.

### Managed bot creation isn't working

Ensure:
1. Bot Management Mode is enabled
2. The creation link format is correct: `https://t.me/newbot/{username}/{bot_username}?name={bot_name}`
3. The username is available (not taken)

---

## Security

### How secure is the platform?

Security measures include:
- Bot tokens encrypted at rest (AES-256-GCM)
- HMAC-SHA256 validation for user authentication
- Rate limiting to prevent abuse
- Loop prevention for bot-to-bot communication

### How do I protect against infinite loops?

Implement these safeguards:
1. **Deduplication** - Cache recent messages
2. **Rate limiting** - Max messages per second
3. **Depth limits** - Max interaction depth
4. **Timeouts** - Conversation time limits

---

## Getting Help

### Where can I get more help?

- 📖 [Documentation](/getting-started)
- 💬 [GitHub Issues](https://github.com/homgorn/bot-to-bot-telegram/issues)
- 📝 [How-To Guides](/howto)

### Can I contribute to the project?

Yes! See our [Contributing Guide](https://github.com/homgorn/bot-to-bot-telegram/blob/main/CONTRIBUTING.md) for details.

---

## Related Questions

### What can I build with this platform?

- AI Agent platforms
- Business bot marketplaces
- Multi-agent workflows
- Interactive games
- Productivity tools

### What is the difference between Bot API and MTProto?

| Feature | Bot API | MTProto |
|---------|---------|---------|
| Bot tokens | Required | Optional |
| Message visibility | Limited | Full |
| Speed | Slower | Faster |
| Complexity | Simpler | Complex |

---

::: tip Still Have Questions?
Check our [How-To Guides](/howto) for specific tutorials.
:::