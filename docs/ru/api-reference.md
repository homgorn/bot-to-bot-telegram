---
title: Справочник API - Bot-to-Bot Telegram
description: Полный справочник API платформы Bot-to-Bot Telegram. REST API эндпоинты, методы Bot API, WebSocket и документация MCP протокола.
head:
  - - meta
    - name: keywords
      content: Справочник Telegram Bot API, REST API Telegram, getManagedBotToken, методы Telegram API, эндпоинты бота, MCP протокол, WebSocket Telegram
  - - meta
    - name: robots
      content: index, follow
---

# Справочник API - Платформа Bot-to-Bot Telegram

## Содержание

1. [Bot API](#bot-api)
2. [REST API](#rest-api)
3. [WebSocket API](#websocket-api)
4. [MCP Протокол](#mcp-протокол)

---

## Bot API

### Managed Bot Методы

#### getManagedBotToken

```typescript
POST /bot{token}/getManagedBotToken

{
  "managed_bot_id": number
}

Response:
{
  "success": true,
  "token": "string"
}
```

#### setMyCommands

```typescript
POST /bot{token}/setMyCommands

{
  "commands": [
    { "command": "start", "description": "Start bot" },
    { "command": "help", "description": "Get help" }
  ]
}
```

---

## REST API

### Эндпоинты

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | /api/bots | Создать managed бот |
| GET | /api/bots | Список ботов пользователя |
| DELETE | /api/bots/:id | Удалить бот |
| POST | /api/agents | Зарегистрировать агента |
| GET | /api/agents | Список агентов |
| POST | /api/tasks | Отправить задачу |

---

## MCP Протокол

### Доступные инструменты

| Инструмент | Описание |
|------------|----------|
| send_message | Отправить текстовое сообщение |
| send_photo | Отправить фото с подписью |
| edit_message_text | Редактировать сообщение |
| answer_callback_query | Ответить на callback |
| get_chat | Получить информацию о чате |

---

**Обновлено:** 18 апреля 2026