---
title: Bot-to-Bot Communication Guide - Bot-to-Bot Telegram
description: Complete guide to Telegram Bot-to-Bot Communication. Learn how to enable inter-bot messaging in groups, prevent infinite loops, and build multi-bot workflows.
head:
  - - meta
    - name: keywords
      content: Telegram Bot-to-Bot Communication, inter-bot messaging, bot-to-bot loop prevention, Bot-to-Bot Mode, Telegram group bot communication, multi-bot workflows
  - - meta
    - name: robots
      content: index, follow
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Bot-to-Bot Communication Guide","description":"Complete guide to Telegram Bot-to-Bot Communication. Enable inter-bot messaging in groups.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/bot-to-bot","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"}}'
---

# Bot-to-Bot Communication Guide

## Complete Guide to Telegram Bot-to-Bot Communication (April 2026)

### Table of Contents

1. [Overview](#overview)
2. [Enabling Bot-to-Bot Mode](#enabling-bot-to-bot-mode)
3. [Communication in Groups](#communication-in-groups)
4. [Communication via Business Accounts](#communication-via-business-accounts)
5. [Loop Prevention](#loop-prevention)
6. [Use Cases](#use-cases)
7. [Code Examples](#code-examples)

---

## Overview

### What is Bot-to-Bot Communication?

Telegram allows bots to communicate with each other in specific contexts:

- **Group Chats** - Bots can interact within the same group
- **Business Accounts** - Bots can send messages via connected business accounts
- **Cross-Bot Workflows** - Complex agentic flows between bots

### Key Requirements

1. **Bot-to-Bot Mode** must be enabled in @BotFather
2. **Context-Specific** - Communication only works in allowed contexts
3. **Loop Prevention** - Must implement safeguards against infinite loops

---

## Enabling Bot-to-Bot Mode

### Step-by-Step

1. Open @BotFather
2. Select your bot
3. Go to **Bot Settings** → **Bot-to-Bot Communication**
4. Enable "Bot-to-Bot Communication Mode"
5. Confirm the action

### Verification

```javascript
// Check if bot has B2B mode enabled
bot.on('message', async (ctx) => {
  const botInfo = await ctx.bot.getMe();
  console.log('Can join groups:', botInfo.can_join_groups);
  console.log('Can read all group messages:', botInfo.can_read_all_group_messages);
});
```

---

## Communication in Groups

### How It Works

In group chats, bots can communicate when:

1. **Command Mention** - `/command@OtherBot`
2. **Reply** - Reply directly to a bot's message
3. **Admin Rights** - Bot has admin rights in the group
4. **Privacy Disabled** - Bot has Group Privacy Mode disabled

### Requirements for Message Reception

| Condition | Bot Receives Messages |
|-----------|----------------------|
| At least one bot has B2B enabled | Yes, with mention/reply |
| Bot is admin in group | Yes, all messages |
| Bot disabled Group Privacy | Yes, all messages |

### Example: Code Review Workflow

```javascript
const reviewerBot = new Telegraf(process.env.REVIEWER_BOT_TOKEN);
const contributorBot = new Telegraf(process.env.CONTRIBUTOR_BOT_TOKEN);

// Contributor bot requests review
contributorBot.command('review', async (ctx) => {
  const code = ctx.message.text.replace('/review', '').trim();
  
  // Send to reviewer bot via group mention
  await ctx.telegram.sendMessage(
    GROUP_ID,
    `🔍 Code review requested:\n\`\`\`\n${code}\n\`\`\``,
    { parse_mode: 'Markdown' }
  );
});

// Reviewer bot processes and responds
reviewerBot.on('message', async (ctx) => {
  if (ctx.message.text.includes('Code review requested')) {
    const feedback = await analyzeCode(ctx.message.text);
    
    await ctx.telegram.sendMessage(
      GROUP_ID,
      `✅ Review complete:\n${feedback}`,
      { reply_to_message_id: ctx.message.message_id }
    );
  }
});
```

---

## Communication via Business Accounts

### Setup Requirements

1. Connect bot to a business account via **Chat Access Mode**
2. Enable Bot-to-Bot Communication Mode on the sending bot
3. Both bots must belong to the same business account

### How It Works

```
Bot A (with B2B enabled) → Business Account → Bot B (same business)
```

### Example: Customer Service Workflow

```javascript
// Support bot sends to bot within same business account
async function escalateToSpecialist(supportBot, ticketId, issue) {
  // Get specialist bot via business account
  const specialistBot = await getSpecialistBotForCategory(issue.category);
  
  // Send via Business API
  await supportBot.telegram.callApi('sendMessage', {
    chat_id: specialistBot.id,
    text: `🎫 New ticket #${ticketId}\n\n${issue.description}`,
    parse_mode: 'HTML'
  });
}
```

---

## Loop Prevention

### Why It Matters

Bot-to-bot communication can easily result in infinite loops:

```
Bot A → Message → Bot B → Response → Bot A → Response → Bot B → ...
```

### Required Safeguards

#### 1. Deduplicate Repeated Messages

```javascript
const messageCache = new LRUCache({ max: 1000 });

bot.on('message', async (ctx) => {
  const messageKey = `${ctx.from.id}:${ctx.message.text}`;
  
  if (messageCache.has(messageKey)) {
    console.log('Duplicate message detected, skipping');
    return;
  }
  
  messageCache.set(messageKey, Date.now());
  // Process message...
});
```

#### 2. Rate Limits

```javascript
const rateLimiter = new Map();

function checkRateLimit(chatId, maxPerSecond = 1) {
  const now = Date.now();
  const lastMessage = rateLimiter.get(chatId) || 0;
  
  if (now - lastMessage < 1000 / maxPerSecond) {
    return false;
  }
  
  rateLimiter.set(chatId, now);
  return true;
}

bot.on('message', async (ctx) => {
  if (!checkRateLimit(ctx.chat.id)) {
    return; // Skip if rate limit exceeded
  }
  // Process message...
});
```

#### 3. Maximum Interaction Depth

```javascript
const MAX_DEPTH = 5;
const interactionDepth = new Map();

async function processWithDepth(ctx, depth = 0) {
  if (depth >= MAX_DEPTH) {
    console.log('Max depth reached, stopping');
    return;
  }
  
  // Process and potentially call another bot
  const result = await doProcessing(ctx);
  
  if (result.needsAnotherBot) {
    await processWithDepth(ctx, depth + 1);
  }
}
```

#### 4. Global Timeout

```javascript
const activeConversations = new Map();

bot.on('message', async (ctx) => {
  const conversationId = getConversationId(ctx);
  const startTime = activeConversations.get(conversationId);
  
  // Check if conversation has been running too long
  if (startTime && Date.now() - startTime > 300000) { // 5 minutes
    console.log('Conversation timeout, aborting');
    activeConversations.delete(conversationId);
    return;
  }
  
  if (!startTime) {
    activeConversations.set(conversationId, Date.now());
  }
  
  // Process message...
});
```

### Complete Loop Prevention Example

```javascript
class BotCommunicationGuard {
  constructor(options = {}) {
    this.maxDepth = options.maxDepth || 5;
    this.maxMessagesPerMinute = options.maxMessagesPerMinute || 30;
    this.conversationTimeout = options.conversationTimeout || 300000; // 5 min
    
    this.messageCache = new LRUCache({ max: 1000 });
    this.rateLimits = new Map();
    this.conversations = new Map();
  }
  
  canProcess(message) {
    const { chatId, userId, text } = message;
    
    // 1. Check deduplication
    const messageKey = `${chatId}:${userId}:${text}`;
    if (this.messageCache.has(messageKey)) {
      return { allowed: false, reason: 'duplicate' };
    }
    this.messageCache.set(messageKey, Date.now());
    
    // 2. Check rate limit
    const lastMessage = this.rateLimits.get(chatId) || 0;
    const now = Date.now();
    if (now - lastMessage < 60000 / this.maxMessagesPerMinute) {
      return { allowed: false, reason: 'rate_limit' };
    }
    this.rateLimits.set(chatId, now);
    
    // 3. Check conversation timeout
    const startTime = this.conversations.get(chatId);
    if (startTime && now - startTime > this.conversationTimeout) {
      this.conversations.delete(chatId);
      return { allowed: false, reason: 'timeout' };
    }
    
    return { allowed: true };
  }
  
  startConversation(chatId) {
    if (!this.conversations.has(chatId)) {
      this.conversations.set(chatId, Date.now());
    }
  }
  
  endConversation(chatId) {
    this.conversations.delete(chatId);
  }
}

// Usage
const guard = new BotCommunicationGuard({
  maxDepth: 5,
  maxMessagesPerMinute: 30,
  conversationTimeout: 300000
});

bot.on('message', async (ctx) => {
  const check = guard.canProcess({
    chatId: ctx.chat.id,
    userId: ctx.from.id,
    text: ctx.message.text
  });
  
  if (!check.allowed) {
    console.log(`Message blocked: ${check.reason}`);
    return;
  }
  
  guard.startConversation(ctx.chat.id);
  try {
    await processMessage(ctx);
  } finally {
    guard.endConversation(ctx.chat.id);
  }
});
```

---

## Use Cases

### Use Case 1: Code Review System

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Contributor    │ ───▶ │   Code Review   │ ───▶ │    Linter       │
│    Bot          │      │      Bot        │      │     Bot         │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                        │                        │
         │                        ▼                        │
         │                  ┌─────────────────┐            │
         └─────────────────▶│   Group Chat    │◀───────────┘
                            └─────────────────┘
```

### Use Case 2: Multi-Agent Customer Support

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Triage Bot    │ ───▶ │   FAQ Bot       │ ───▶ │  Escalation     │
│                 │      │                 │      │     Bot         │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Use Case 3: Content Creation Pipeline

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Research      │ ───▶ │    Writer       │ ───▶ │    Publisher    │
│     Bot         │      │      Bot        │      │      Bot        │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Code Examples

### Example 1: Group Chat Communication (Telegraf)

```javascript
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Enable bot-to-bot mode
bot.on('message', async (ctx) => {
  // Check if message is from another bot
  if (ctx.message.from.is_bot) {
    console.log('Received message from bot:', ctx.message.from.username);
    
    // Process and potentially respond
    const response = await processBotMessage(ctx.message);
    
    if (response) {
      await ctx.reply(response, {
        reply_to_message_id: ctx.message.message_id
      });
    }
  }
});

// Handle commands with @ mention
bot.on('edited_message', async (ctx) => {
  if (ctx.editedMessage.text.includes('@YourBot')) {
    await ctx.reply('I see you edited a message mentioning me!');
  }
});

bot.launch();
```

### Example 2: Multi-Bot Orchestration (Python/aiogram)

```python
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
import asyncio

# Initialize multiple bots
bots = {
    'research': Bot(token=os.getenv('RESEARCH_BOT_TOKEN')),
    'analyzer': Bot(token=os.getenv('ANALYZER_BOT_TOKEN')),
    'writer': Bot(token=os.getenv('WRITER_BOT_TOKEN'))
}

dp = Dispatcher()

async def orchestrate_task(user_request: str):
    """Orchestrate task across multiple bots"""
    
    # Step 1: Research
    research_result = await bots['research'].send_message(
        chat_id=os.getenv('ORCHESTRATION_GROUP'),
        text=f"🔍 Research: {user_request}"
    )
    
    # Wait for research bot to process
    await asyncio.sleep(2)
    
    # Step 2: Analyze
    analyzer_result = await bots['analyzer'].send_message(
        chat_id=os.getenv('ORCHESTRATION_GROUP'),
        text=f"📊 Analyze the research results"
    )
    
    # Step 3: Write
    writer_result = await bots['writer'].send_message(
        chat_id=os.getenv('ORCHESTRATION_GROUP'),
        text=f"✍️ Create final output"
    )
    
    return "Task completed across multiple agents"

@dp.message(Command("orchestrate"))
async def cmd_orchestrate(message: Message):
    task = message.text.replace('/orchestrate', '').strip()
    result = await orchestrate_task(task)
    await message.answer(result)

if __name__ == "__main__":
    dp.run_polling(bots['research'])
```

### Example 3: Business Account Communication

```javascript
// Connect bots to same business account
const supportBot = new Telegraf(process.env.SUPPORT_BOT_TOKEN);
const specialistBot = new Telegraf(process.env.SPECIALIST_BOT_TOKEN);

// Enable Chat Access Mode on both bots via @BotFather

// Support bot escalates to specialist
async function escalateToSpecialist(ticketId, issue) {
  // Use business account API to send to specialist bot
  await supportBot.telegram.callApi('sendMessage', {
    chat_id: specialistBot.botInfo.id, // Must be same business account
    text: `🎫 Escalation #${ticketId}\n\n${issue}`,
    parse_mode: 'HTML'
  });
}

// Specialist bot receives and processes
specialistBot.on('message', async (ctx) => {
  if (ctx.message.text.startsWith('🎫 Escalation')) {
    await processEscalation(ctx.message.text);
    await ctx.reply('Escalation received and processing...');
  }
});

bot.launch();
```

---

## Best Practices

1. **Always implement loop prevention** - Required for production
2. **Use admin rights strategically** - Gives access to all group messages
3. **Disable group privacy only when needed** - Security consideration
4. **Monitor message rates** - Detect potential loops early
5. **Log all bot-to-bot interactions** - For debugging and analytics

---

## Resources

- [Telegram Bot-to-Bot Communication](https://core.telegram.org/bots/features#bot-to-bot-communication)
- [Bot API Documentation](https://core.telegram.org/bots/api)
- [aiogram Documentation](https://docs.aiogram.dev/)

---

**Last Updated:** April 18, 2026
**Version:** 1.0.0