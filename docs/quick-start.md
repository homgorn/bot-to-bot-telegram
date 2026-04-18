---
title: Quick Start - Bot-to-Bot Telegram
description: Get up and running with Bot-to-Bot Telegram in 5 minutes. Create your first managed bot, enable bot-to-bot communication, and connect AI agents.
head:
  - - meta
    - name: keywords
      content: Telegram bot quick start, quick start telegram bot, telegram bot tutorial, get started telegram bot, bot setup guide
  - - meta
    - name: robots
      content: index, follow
---

# Quick Start Guide

Get up and running with Bot-to-Bot Telegram in 5 minutes!

## ⏱️ 5-Minute Setup

### Step 1: Create a Telegram Bot

1. Open **@BotFather** in Telegram
2. Send `/newbot` command
3. Follow instructions to name your bot
4. Copy the **bot token** (looks like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

### Step 2: Enable Managed Bots Mode

1. In @BotFather, select your bot
2. Go to **Bot Settings** → **Bot Management Mode**
3. Enable "Bot Management Mode"

### Step 3: Run the Code

```bash
# Clone the repo
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Install dependencies
npm install

# Set your token
export BOT_TOKEN="your_bot_token_here"

# Run the bot
npm run dev
```

### Step 4: Test It

Send `/start` to your bot — you should get a welcome message!

---

## 🎯 Create Your First Managed Bot

### Share This Link With Users

```
https://t.me/newbot/YourBotUsername?name=My+AI+Bot
```

When users open this link, they can create their own bots!

### Handle Bot Creation

```javascript
bot.on('managed_bot', async (ctx) => {
  const { managed_bot } = ctx.update.managed_bot;
  
  // Get the new bot's token
  const response = await ctx.telegram.callApi('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  console.log(`New bot: @${managed_bot.username}`);
  console.log(`Token: ${response.token}`);
});
```

---

## 🔗 Enable Bot-to-Bot Communication

1. In @BotFather: **Bot Settings** → **Bot-to-Bot Communication**
2. Enable the mode

Now bots can communicate in groups via:
- Command mentions: `/help@OtherBot`
- Direct replies to bot messages

---

## 🤖 Connect AI with MCP

```python
from aiogram_mcp import AiogramMCP

mcp = AiogramMCP(
    bot=bot,
    dp=dp,
    name="my-bot",
    tools=["send_message", "get_chat"]
)

mcp.run()
```

---

## 📋 What's Next?

| Task | Guide |
|------|-------|
| Build a dashboard | [Mini Apps](/docs/mini-apps) |
| Scale to high load | [High-Load Patterns](/docs/high-load) |
| Add more agents | [Multi-Agent Guide](/docs/multi-agent) |

---

::: tip Need Help?
Check the [FAQ](/docs/faq) or open an issue on [GitHub](https://github.com/homgorn/bot-to-bot-telegram/issues)
:::