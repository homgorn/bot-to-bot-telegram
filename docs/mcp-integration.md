# MCP Integration Guide

## Model Context Protocol for Telegram Bots (April 2026)

### Table of Contents

1. [Overview](#overview)
2. [What is MCP?](#what-is-mcp)
3. [Integration Options](#integration-options)
4. [Server Implementation](#server-implementation)
5. [Client Configuration](#client-configuration)
6. [Tools and Resources](#tools-and-resources)
7. [Examples](#examples)

---

## Overview

### Why MCP?

Model Context Protocol (MCP) standardizes how AI models interact with external tools and services. For Telegram bots, MCP enables:

- **AI-Powered Responses** - Connect your bot to powerful AI models
- **Tool Discovery** - AI agents can discover available bot capabilities
- **Structured Context** - Provide rich context to AI models
- **Real-Time Events** - Push Telegram events to AI agents

---

## What is MCP?

MCP is an open protocol that standardizes how AI models:

1. **Discover Tools** - Find available functions they can call
2. **Call Tools** - Execute operations with structured parameters
3. **Access Resources** - Read data from external sources
4. **Receive Prompts** - Get predefined prompt templates

### MCP Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   AI Model  │ ───▶ │  MCP Client │ ───▶ │  MCP Server │
│  (Claude,  │      │             │      │   (Your     │
│   GPT, etc) │      │             │      │    Bot)     │
└─────────────┘      └─────────────┘      └─────────────┘
                          │                       │
                          │                       ▼
                          │               ┌─────────────┐
                          └──────────────▶│  Telegram   │
                                          │    API      │
                                          └─────────────┘
```

---

## Integration Options

### Option 1: aiogram-mcp (Python)

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
    tools=[
        "send_message",
        "edit_message", 
        "answer_callback_query",
        "get_chat",
        "get_chat_administrators"
    ]
)

mcp.run()  # Start MCP server alongside bot
```

### Option 2: Telegram Bridge MCP (TypeScript)

```bash
pnpm install telegram-bridge-mcp
```

```typescript
import { TelegramBridgeMCP } from 'telegram-bridge-mcp';

const bridge = new TelegramBridgeMCP({
  botToken: process.env.BOT_TOKEN!,
  allowedUsers: ['USER_ID']
});

await bridge.start();
```

### Option 3: Custom MCP Server

```typescript
import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';

class TelegramMCPServer {
  constructor(private bot: Telegraf) {}
  
  async start() {
    const transport = new StdioServerTransport();
    const server = new Server(
      { name: 'telegram-bot', version: '1.0.0' },
      {
        capabilities: {
          tools: {},
          resources: {}
        }
      }
    );
    
    server.setRequestHandler('tools/list', async () => ({
      tools: [
        {
          name: 'send_message',
          description: 'Send a message to a Telegram chat',
          inputSchema: {
            type: 'object',
            properties: {
              chat_id: { type: 'string' },
              text: { type: 'string' }
            },
            required: ['chat_id', 'text']
          }
        }
      ]
    }));
    
    server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      if (name === 'send_message') {
        await this.bot.telegram.sendMessage(args.chat_id, args.text);
        return { content: [{ type: 'text', text: 'Message sent' }] };
      }
    });
    
    await server.connect(transport);
  }
}
```

---

## Server Implementation

### Define Tools

```typescript
const tools = [
  {
    name: 'send_message',
    description: 'Send a text message to a Telegram user or group',
    inputSchema: {
      type: 'object',
      properties: {
        chat_id: { 
          type: 'string', 
          description: 'The chat ID to send to' 
        },
        text: { 
          type: 'string', 
          description: 'The message text' 
        },
        parse_mode: {
          type: 'string',
          enum: ['Markdown', 'HTML'],
          description: 'Text formatting mode'
        }
      },
      required: ['chat_id', 'text']
    }
  },
  {
    name: 'send_inline_keyboard',
    description: 'Send message with inline keyboard buttons',
    inputSchema: {
      type: 'object',
      properties: {
        chat_id: { type: 'string' },
        text: { type: 'string' },
        buttons: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              callback_data: { type: 'string' }
            }
          }
        }
      },
      required: ['chat_id', 'text', 'buttons']
    }
  },
  {
    name: 'get_chat_info',
    description: 'Get information about a Telegram chat',
    inputSchema: {
      type: 'object',
      properties: {
        chat_id: { type: 'string' }
      },
      required: ['chat_id']
    }
  }
];
```

### Define Resources

```typescript
const resources = [
  {
    uri: 'telegram://bot/info',
    name: 'Bot Information',
    description: 'Get information about the bot',
    mimeType: 'application/json'
  },
  {
    uri: 'telegram://chat/{chat_id}',
    name: 'Chat Information',
    description: 'Get information about a specific chat',
    mimeType: 'application/json'
  }
];
```

---

## Client Configuration

### Claude Desktop

```json
{
  "mcpServers": {
    "telegram-bot": {
      "command": "npx",
      "args": ["telegram-mcp-server"],
      "env": {
        "BOT_TOKEN": "your_bot_token"
      }
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "telegram-bot": {
      "command": "node",
      "args": ["/path/to/telegram-mcp-server.js"]
    }
  }
}
```

### VS Code (via Copilot)

```json
{
  "mcpServers": {
    "telegram-bot": {
      "command": "python",
      "args": ["-m", "aiogram_mcp"]
    }
  }
}
```

---

## Tools and Resources

### Available Tools

| Tool | Description |
|------|-------------|
| `send_message` | Send text message |
| `send_photo` | Send photo with caption |
| `send_video` | Send video file |
| `edit_message_text` | Edit existing message |
| `answer_callback_query` | Answer inline button callback |
| `get_chat` | Get chat information |
| `get_chat_administrators` | Get chat admins |
| `export_chat_invite_link` | Generate invite link |
| `ban_chat_member` | Ban user from chat |
| `unban_chat_member` | Unban user |

### Available Resources

| Resource | Description |
|----------|-------------|
| `telegram://bot/info` | Bot username, ID, capabilities |
| `telegram://chat/{id}` | Chat information |
| `telegram://user/{id}` | User profile |
| `telegram://stats` | Bot usage statistics |

---

## Examples

### Example 1: AI-Powered FAQ Bot

```python
from aiogram import Bot, Dispatcher
from aiogram_mcp import AiogramMCP

bot = Bot(token="BOT_TOKEN")
dp = Dispatcher(bot)

mcp = AiogramMCP(
    bot=bot,
    dp=dp,
    name="faq-bot",
    tools=[
        "send_message",
        "get_chat",
        "answer_callback_query"
    ],
    prompts=[
        {
            "name": "faq_response",
            "description": "Generate FAQ response",
            "arguments": [
                {"name": "question", "description": "User question"}
            ]
        }
    ]
)

mcp.run()
```

### Example 2: Multi-Agent Support System

```typescript
// MCP server exposes multiple agent tools
const server = {
  tools: [
    // Triage agent
    {
      name: 'triage_classify',
      description: 'Classify incoming support request'
    },
    // FAQ agent
    {
      name: 'faq_search',
      description: 'Search FAQ database'
    },
    // Escalation agent
    {
      name: 'create_ticket',
      description: 'Create support ticket'
    }
  ]
};
```

---

## Best Practices

1. **Secure your MCP server** - Validate all incoming requests
2. **Rate limit tool calls** - Prevent abuse from AI models
3. **Log tool executions** - Track AI agent behavior
4. **Implement timeouts** - AI models may call tools multiple times
5. **Validate responses** - Sanitize AI-generated content

---

## Resources

- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCP SDK JavaScript](https://github.com/modelcontextprotocol/sdk)
- [aiogram-mcp](https://pypi.org/project/aiogram-mcp/)
- [Telegram Bridge MCP](https://github.com/electricessence/Telegram-Bridge-MCP)

---

**Last Updated:** April 18, 2026