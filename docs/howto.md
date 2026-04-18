---
title: How-To Guides - Bot-to-Bot Telegram
description: Step-by-step tutorials for building Telegram bots with Managed Bots, multi-agent systems, MCP integration, and high-load architecture.
head:
  - - meta
    - name: keywords
      content: Telegram bot tutorial, How to create Telegram bot, aiogram tutorial, Telegraf tutorial, MCP integration tutorial, Telegram Mini Apps tutorial, high load Telegram bot
  - - meta
    - name: robots
      content: index, follow
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Bot-to-Bot Telegram How-To Guides","description":"Step-by-step tutorials for building Telegram bots with Managed Bots, multi-agent systems, and MCP integration.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/howto","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"},"hasPart":{"@type":"HowTo","name":"Create Managed Bot","steps":[{"@type":"HowToStep","text":"Enable Bot Management Mode in BotFather"},{"@type":"HowToStep","text":"Run manager bot with token"},{"@type":"HowToStep","text":"Share creation link with users"}]}}'
---

# How-To Guides

Step-by-step tutorials for common tasks and scenarios.

---

## Creating Managed Bots

### How to Create a Managed Bot

A complete guide to programmatically create Telegram bots for your users.

**Prerequisites:**
- Bot with Bot Management Mode enabled
- Node.js or Python environment

**Steps:**

1. **Enable in BotFather**
   ```
   Bot Settings → Bot Management Mode → Enable
   ```

2. **Create the manager bot** (Node.js/Telegraf):
   ```javascript
   const { Telegraf } = require('telegraf');
   
   const bot = new Telegraf(process.env.BOT_TOKEN);
   
   bot.on('managed_bot', async (ctx) => {
     const { managed_bot, user } = ctx.update.managed_bot;
     
     // Get the new bot's token
     const response = await ctx.telegram.callApi('getManagedBotToken', {
       managed_bot_id: managed_bot.id
     });
     
     console.log(`Created bot: @${managed_bot.username}`);
     console.log(`Token: ${response.token}`);
   });
   
   bot.launch();
   ```

3. **Share the creation link**:
   ```
   https://t.me/newbot/YourBotUsername/NewBotName?name=My+AI+Bot
   ```

**Related:** [Managed Bots Guide](/managed-bots) | [API Reference](/api-reference)

---

## Bot-to-Bot Communication

### How to Enable Bot-to-Bot Messaging

Learn how to set up communication between bots in groups.

**Prerequisites:**
- At least one bot with Bot-to-Bot Mode enabled

**Steps:**

1. **Enable in BotFather**
   ```
   Bot Settings → Bot-to-Bot Communication → Enable
   ```

2. **Handle bot messages**:
   ```javascript
   bot.on('message', async (ctx) => {
     if (ctx.message.from.is_bot) {
       console.log('Received from bot:', ctx.message.from.username);
       // Process the message
     }
   });
   ```

3. **Send to another bot** (in same group):
   ```
   /help@OtherBot
   ```
   Or reply to the bot's message directly.

**Related:** [Bot-to-Bot Communication](/bot-to-bot)

---

## Multi-Agent Systems

### How to Orchestrate Multiple AI Agents

Build a system where specialized agents work together.

**Architecture:**
```
User Request
    │
    ▼
┌─────────────┐
│  Triage    │ ──▶ Route to appropriate agent
│   Agent    │
└─────────────┘
    │
    ├──────────────────┐
    ▼                  ▼
┌─────────────┐    ┌─────────────┐
│    FAQ     │    │Escalation  │
│   Agent    │    │   Agent    │
└─────────────┘    └─────────────┘
```

**Implementation:**

```javascript
const agents = {
  triage: async (msg) => {
    const category = classifyMessage(msg);
    return category === 'faq' ? 'faq' : 'escalation';
  },
  
  faq: async (msg) => {
    return searchFAQ(msg);
  },
  
  escalation: async (msg) => {
    return createTicket(msg);
  }
};

async function processMessage(msg) {
  const agentType = await agents.triage(msg);
  return await agents[agentType](msg);
}
```

**Related:** [Multi-Agent Orchestration](/multi-agent)

---

## MCP Integration

### How to Connect AI Models via MCP

Connect your bot to Claude, GPT, or other AI models.

**Option 1: Using aiogram-mcp (Python)**

```bash
pip install aiogram-mcp
```

```python
from aiogram import Bot, Dispatcher
from aiogram_mcp import AiogramMCP

bot = Bot(token="BOT_TOKEN")
dp = Dispatcher(bot)

mcp = AiogramMCP(
    bot=bot,
    dp=dp,
    name="my-bot",
    tools=["send_message", "get_chat"]
)

mcp.run()
```

**Option 2: Custom MCP Server**

```typescript
import { Server } from '@modelcontextprotocol/sdk/server';

const server = new Server({ name: 'telegram-bot', version: '1.0.0' });

server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'send_message',
      inputSchema: {
        type: 'object',
        properties: {
          chat_id: { type: 'string' },
          text: { type: 'string' }
        }
      }
    }
  ]
}));
```

**Related:** [MCP Integration](/mcp-integration)

---

## High-Load Optimization

### How to Handle High Traffic

Optimize your bot for 1000+ messages per second.

**Key Strategies:**

1. **Rate Limiting**
   ```javascript
   class TokenBucket {
     constructor(capacity = 30, rate = 30) {
       this.capacity = capacity;
       this.tokens = capacity;
       this.lastRefill = Date.now();
     }
     
     async acquire() {
       this.refill();
       if (this.tokens >= 1) {
         this.tokens--;
         return true;
       }
       return false;
     }
   }
   ```

2. **Horizontal Scaling**
   ```
   Load Balancer → Bot Instance 1
                → Bot Instance 2
                → Bot Instance N
   ```

3. **Message Queuing**
   ```javascript
   const queue = new RedisQueue('telegram:queue');
   
   // Producer
   await queue.publish(message);
   
   // Consumer
   await queue.subscribe(async (msg) => {
     await processMessage(msg);
   });
   ```

**Related:** [High-Load Architecture](/high-load)

---

## Telegram Mini Apps

### How to Create a Dashboard Mini App

Build a web dashboard that runs inside Telegram.

**Step 1: Create the Mini App**

```bash
npm create @telegram-apps/mini-app@latest ./dashboard
```

**Step 2: Configure Telegram SDK**

```typescript
import { init } from '@tma.js/sdk';

const sdk = init();

// Get user data
const user = sdk.initDataUnsafe.user;
```

**Step 3: Set up in BotFather**

```
Bot Settings → Configure Mini App
```

**Step 4: Launch from bot**

```javascript
bot.command('dashboard', async (ctx) => {
  await ctx.reply('Open dashboard:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Dashboard', web_app: 'https://your-app.vercel.app' }]
      ]
    }
  });
});
```

**Related:** [Telegram Mini Apps](/mini-apps)

---

## Security

### How to Implement Loop Prevention

Prevent infinite bot-to-bot communication loops.

**Implementation:**

```javascript
const MAX_DEPTH = 5;
const messageCache = new Map();

bot.on('message', async (ctx) => {
  const key = `${ctx.from.id}:${ctx.message.text}`;
  
  // Check deduplication
  if (messageCache.has(key)) {
    console.log('Duplicate, skipping');
    return;
  }
  
  messageCache.set(key, Date.now());
  
  // Process message
  await processMessage(ctx);
  
  // Clean up old entries
  if (messageCache.size > 1000) {
    const oldest = Date.now() - 60000;
    for (const [k, v] of messageCache) {
      if (v < oldest) messageCache.delete(k);
    }
  }
});
```

**Related:** [Bot-to-Bot Communication](/bot-to-bot) | [Architecture](/architecture)

---

::: tip Need More Help?
Check the [FAQ](/faq) or open an issue on GitHub.
:::