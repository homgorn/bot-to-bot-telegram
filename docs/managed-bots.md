---
title: Managed Bots API Guide - Bot-to-Bot Telegram
description: Complete guide to Telegram Managed Bots API (Bot API 9.6). Learn how to programmatically create, manage, and control Telegram bots. Step-by-step tutorials and code examples.
head:
  - - meta
    - name: keywords
      content: Telegram Managed Bots API, Bot API 9.6, getManagedBotToken, create Telegram bot programmatically, Bot Management Mode, Telegram bot tokens, managed bot lifecycle
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Managed Bots API Guide - Bot-to-Bot Telegram
  - - meta
    - property: og:description
      content: Complete guide to Telegram Managed Bots API. Programmatically create and manage bots.
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Managed Bots API Guide","description":"Complete guide to Telegram Managed Bots API (Bot API 9.6). Learn to programmatically create and manage bots.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/managed-bots","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"},"programmingLanguage":["JavaScript","Python"]}'
---

# Managed Bots API Guide

## Complete Guide to Telegram Managed Bots (Bot API 9.6, April 2026)

### Table of Contents

1. [Overview](#overview)
2. [Enabling Managed Bots](#enabling-managed-bots)
3. [Creating Managed Bots](#creating-managed-bots)
4. [Managing Bot Tokens](#managing-bot-tokens)
5. [Bot Lifecycle](#bot-lifecycle)
6. [User Experience](#user-experience)
7. [Security Considerations](#security-considerations)
8. [Use Cases](#use-cases)
9. [Code Examples](#code-examples)

---

## Overview

### What are Managed Bots?

Managed Bots allow your bot to create and manage other bots on behalf of users. This enables:

- **User Bot Spawning** - Users can spin up personal AI agents, business bots, games
- **Programmatic Management** - Full API control over created bots
- **Seamless UX** - Users create bots without leaving Telegram

### Bot API Version

This guide covers **Bot API 9.6** (April 2026), which includes:
- `managed_bot` update type
- `getManagedBotToken` method
- Enhanced bot management capabilities

---

## Enabling Managed Bots

### Step 1: Choose or Create Manager Bot

1. Open @BotFather
2. Create new bot or select existing one: `/newbot` or select from list
3. Note the bot username (e.g., `ManagerBot`)

### Step 2: Enable Bot Management Mode

1. In @BotFather, select your bot
2. Navigate to: **Bot Settings** → **Bot Management Mode**
3. Enable "Bot Management Mode"
4. Confirm the action

### Step 3: Verify Configuration

```bash
# Test using Bot API
curl "https://api.telegram.org/bot<TOKEN>/getMe"
```

You should see your bot with additional capabilities.

---

## Creating Managed Bots

### Method 1: Direct Link Creation

Generate a link for users to create bots:

```
https://t.me/newbot/{manager_bot_username}/{new_username}?name={new_name}
```

#### URL Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `manager_bot_username` | Yes | Username of your manager bot |
| `new_username` | No | Suggested bot username (placeholder) |
| `new_name` | No | Suggested bot display name |

#### Example Link

```
https://t.me/newbot/ManagerBot/CoolAIAgentBot?name=Cool+AI+Agent
```

When user opens this link, they'll see:
- Pre-filled @username (editable)
- Pre-filled display name (editable)
- Confirmation button

### Method 2: Programmatic Creation

Handle `managed_bot` update when user confirms creation:

```javascript
// aiogram 3.x example
bot.on('managed_bot', async (ctx) => {
  const { managed_bot, user } = ctx.update.managed_bot;
  
  console.log(`New bot created: ${managed_bot.name}`);
  console.log(`Created by: ${user.first_name}`);
  
  // Get bot token
  const response = await ctx.api.call('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  const botToken = response.token;
  // Store token securely!
});
```

---

## Managing Bot Tokens

### Getting Bot Token

```typescript
interface GetManagedBotTokenParams {
  managed_bot_id: number;
}

interface GetManagedBotTokenResponse {
  success: boolean;
  token: string; // The bot's access token
}
```

### Using the Token

```javascript
// Create bot instance with new token
const newBot = new Telegraf(newBotToken);

// Configure new bot
newBot.command('start', (ctx) => {
  ctx.reply('Welcome to your new AI Agent!');
});

// Launch the bot
newBot.launch();
```

### Token Storage

```typescript
interface TokenStorage {
  async store(botId: string, token: string): Promise<void>;
  async get(botId: string): Promise<string>;
  async delete(botId: string): Promise<void>;
  async rotate(botId: string): Promise<string>;
}

// Encrypted storage example
class EncryptedTokenStorage implements TokenStorage {
  private encryptionKey: Buffer;
  
  constructor(key: string) {
    this.encryptionKey = Buffer.from(key, 'hex');
  }
  
  async store(botId: string, token: string): Promise<void> {
    const encrypted = this.encrypt(token);
    await db.query(
      'INSERT INTO bot_tokens (bot_id, encrypted_token) VALUES ($1, $2)',
      [botId, encrypted]
    );
  }
  
  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', this.encryptionKey, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final()
    ]);
    return iv.toString('hex') + ':' + cipher.getAuthTag().toString('hex') + ':' + encrypted.toString('hex');
  }
}
```

---

## Bot Lifecycle

### Lifecycle Stages

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Created   │ ──▶ │  Configured │ ──▶ │   Active    │ ──▶ │   Deleted   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Stage Descriptions

| Stage | Description | Actions |
|-------|-------------|---------|
| Created | Bot created via link confirmation | Get token, initialize |
| Configured | Bot settings applied | Set commands, description |
| Active | Bot running and responding | Process messages |
| Deleted | Bot removed | Revoke token, cleanup |

### Configuration Options

```typescript
interface BotConfiguration {
  // Bot Profile
  name: string;           // Display name
  username: string;      // @username
  description: string;    // Bot description
  about: string;          // About text
  
  // Commands
  commands: BotCommand[]; // /commands list
  
  // Settings
  privacy: boolean;       // Group privacy mode
  attachments: boolean;    // Attachment menu
  
  // Media
  avatar?: Buffer;        // Profile photo
}
```

---

## User Experience

### Creation Flow

```
1. User receives link (via chat, channel, website)
         │
         ▼
2. User taps link → Opens Telegram mini-app
         │
         ▼
3. Pre-filled form: username + name (editable)
         │
         ▼
4. User taps "Create Bot"
         │
         ▼
5. System creates bot, gets token
         │
         ▼
6. Manager bot receives managed_bot update
         │
         ▼
7. User sees success message with bot link
```

### User Interface

```javascript
// Send creation confirmation with inline keyboard
await ctx.reply(
  '🎉 Your bot has been created!',
  {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Bot', url: `t.me/${botUsername}` }],
        [{ text: 'Configure', callback_data: `config_${botId}` }]
      ]
    }
  }
);
```

---

## Security Considerations

### Required Safeguards

1. **Token Security**
   - Encrypt tokens at rest
   - Use secure storage (Vault, encrypted DB)
   - Implement token rotation

2. **User Validation**
   - Verify user identity before bot creation
   - Implement rate limits per user
   - Add captcha for spam prevention

3. **Bot-to-Bot Loop Prevention**
   ```javascript
   // Implement depth limiting
   const MAX_DEPTH = 5;
   const activeChats = new Map();
   
   bot.on('message', async (ctx) => {
     const chatId = ctx.message.chat.id;
     const currentDepth = activeChats.get(chatId) || 0;
     
     if (currentDepth >= MAX_DEPTH) {
       return; // Stop processing
     }
     
     activeChats.set(chatId, currentDepth + 1);
     
     try {
       await processMessage(ctx);
     } finally {
       activeChats.set(chatId, currentDepth);
     }
   });
   ```

4. **Rate Limiting**
   - Per-user limits
   - Global rate limits for API calls
   - Implement Retry-After handling

---

## Use Cases

### Use Case 1: AI Agent Platform

```
Users can create personal AI agents with custom prompts.
Each bot is powered by AI (via MCP integration).
```

```javascript
// Setup AI agent for new bot
async function setupAIAgent(botToken, userPrompt) {
  const agent = new AIAgent({
    model: 'claude-3',
    prompt: userPrompt
  });
  
  const bot = new Telegraf(botToken);
  
  bot.on('message', async (ctx) => {
    const response = await agent.complete(ctx.message.text);
    await ctx.reply(response);
  });
  
  bot.launch();
}
```

### Use Case 2: Business Bot Marketplace

```
Pre-built bots for common business needs:
- Customer support
- Order tracking
- Appointment booking
```

### Use Case 3: Gaming Platform

```
Users create game bots for:
- Trivia games
- Quiz bots
- Interactive adventures
```

### Use Case 4: Productivity Tools

```
Personal productivity assistants:
- Task management
- Note taking
- Calendar integration
```

---

## Code Examples

### Example 1: Complete Manager Bot (Node.js/Telegraf)

```javascript
const { Telegraf, Markup } = require('telegraf');
const crypto = require('crypto');

const bot = new Telegraf(process.env.MANAGER_BOT_TOKEN);

// Store tokens securely (use encrypted storage in production)
const botTokens = new Map();

// Handle /start - show create bot button
bot.command('start', async (ctx) => {
  const link = generateManagedBotLink('ManagerBot', '', '');
  
  await ctx.reply(
    '🤖 Создайте своего персонального AI бота',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Создать бота', link)]
    ])
  );
});

// Handle managed_bot update
bot.on('managed_bot', async (ctx) => {
  const { managed_bot, user } = ctx.update.managed_bot;
  
  // Get bot token
  const response = await ctx.telegram.callApi('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  const token = response.token;
  
  // Store token securely
  botTokens.set(managed_bot.id.toString(), token);
  
  // Initialize the new bot
  await initializeNewBot(token, managed_bot);
  
  // Notify user
  await ctx.reply(
    `✅ Бот @${managed_bot.username} создан!`,
    Markup.inlineKeyboard([
      [Markup.button.url('Открыть', `https://t.me/${managed_bot.username}`)]
    ])
  );
});

function generateManagedBotLink(managerUsername, suggestedUsername, suggestedName) {
  let link = `https://t.me/newbot/${managerUsername}`;
  if (suggestedUsername) link += `/${suggestedUsername}`;
  if (suggestedName) link += `?name=${encodeURIComponent(suggestedName)}`;
  return link;
}

async function initializeNewBot(token, botInfo) {
  const newBot = new Telegraf(token);
  
  // Set bot description
  await newBot.telegram.setDescription(
    `Personal AI Agent - Created for ${botInfo.name}`
  );
  
  // Set commands
  await newBot.telegram.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Get help' },
    { command: 'ai', description: 'Ask AI' }
  ]);
  
  // Handle messages
  newBot.on('message', async (ctx) => {
    await ctx.reply('AI Agent is thinking...');
    // Add AI integration here
  });
  
  // Launch
  newBot.launch();
}

bot.launch();
```

### Example 2: Manager Bot (Python/aiogram)

```python
from aiogram import Bot, Dispatcher, F
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command
import os

TOKEN = os.getenv("MANAGER_BOT_TOKEN")

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

# Store tokens in database (use encrypted storage in production)
bot_tokens = {}

@dp.message(Command("start"))
async def cmd_start(message: Message):
    link = generate_managed_bot_link("ManagerBot", "", "")
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Создать бота", web_app=link)]
        ]
    )
    await message.answer(
        "🤖 Создайте своего персонального AI бота",
        reply_markup=keyboard
    )

@dp.managed_bot()
async def handle_managed_bot(update: dict):
    managed_bot = update.get('managed_bot')
    user = update.get('user')
    
    bot_id = managed_bot.get('id')
    username = managed_bot.get('username')
    
    # Get bot token
    response = await bot.call_api('getManagedBotToken', {
        'managed_bot_id': bot_id
    })
    
    token = response.get('token')
    bot_tokens[bot_id] = token
    
    # Initialize new bot
    await initialize_new_bot(token, managed_bot)
    
    await bot.send_message(
        user.get('id'),
        f"✅ Бот @{username} создан!"
    )

def generate_managed_bot_link(manager_username: str, suggested_username: str, suggested_name: str) -> str:
    link = f"https://t.me/newbot/{manager_username}"
    if suggested_username:
        link += f"/{suggested_username}"
    if suggested_name:
        link += f"?name={suggested_name}"
    return link

async def initialize_new_bot(token: str, bot_info: dict):
    new_bot = Bot(token=token)
    
    await new_bot.set_description(f"Personal AI Agent - {bot_info.get('name')}")
    
    await new_bot.set_my_commands([
        {"command": "start", "description": "Start the bot"},
        {"command": "help", "description": "Get help"},
        {"command": "ai", "description": "Ask AI"}
    ])
    
    # Add message handlers
    # ...

if __name__ == "__main__":
    dp.run_polling(bot)
```

---

## API Reference

### Managed Bot Update

```typescript
interface ManagedBotUpdate {
  update_id: number;
  managed_bot: {
    chat: Chat;
    user: User;
    managed_bot: {
      id: number;
      username: string;
      first_name: string;
    };
  };
}
```

### Methods

| Method | Description |
|--------|-------------|
| `getManagedBotToken` | Get access token for managed bot |
| `setChatMenuButton` | Configure menu button |
| `setMyCommands` | Set bot commands |
| `setDescription` | Set bot description |
| `setAbout` | Set bot about text |

---

## Best Practices

1. **User Onboarding**
   - Show clear instructions
   - Provide examples
   - Limit bot creation rate

2. **Bot Configuration**
   - Set default commands
   - Configure welcome message
   - Add bot to groups by default

3. **Error Handling**
   - Handle creation failures gracefully
   - Provide clear error messages
   - Implement retry logic

4. **Monitoring**
   - Track bot creation rate
   - Monitor active bots
   - Log token usage

---

## Resources

- [Telegram Managed Bots Documentation](https://core.telegram.org/bots/features#managed-bots)
- [Bot API Reference](https://core.telegram.org/bots/api)
- [aiogram Documentation](https://docs.aiogram.dev/)
- [Telegraf Documentation](https://telegraf.js.org/)

---

**Last Updated:** April 18, 2026
**Version:** 1.0.0