---
title: Быстрый старт - Bot-to-Bot Telegram
description: Начните работу с Bot-to-Bot Telegram за 5 минут. Создайте свой первый управляемый бот, включите межботовую коммуникацию и подключите AI агентов.
head:
  - - meta
    - name: keywords
      content: Быстрый старт Telegram бот, как создать Telegram бот, урок по Telegram боту, настройка бота
  - - meta
    - name: robots
      content: index, follow
---

# Быстрый старт

Начните работу с Bot-to-Bot Telegram за 5 минут!

## ⏱️ Быстрая настройка

### Шаг 1: Создайте Telegram бота

1. Откройте **@BotFather** в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям по именованию бота
4. Скопируйте **токен бота** (выглядит как `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

### Шаг 2: Включите режим Managed Bots

1. В @BotFather выберите вашего бота
2. Перейдите в **Настройки бота** → **Режим управления ботами**
3. Включите "Режим управления ботами"

### Шаг 3: Запустите код

```bash
# Клонируйте репозиторий
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Установите зависимости
npm install

# Установите токен
export BOT_TOKEN="ваш_токен_бота"

# Запустите бота
npm run dev
```

### Шаг 4: Тестируйте

Отправьте `/start` вашему боту — вы должны получить приветственное сообщение!

---

## 🎯 Создайте своего первого Managed Bot

### Поделитесь этой ссылкой с пользователями

```
https://t.me/newbot/YourBotUsername?name=My+AI+Bot
```

Когда пользователи откроют эту ссылку, они смогут создавать своих собственных ботов!

### Обработка создания бота

```javascript
bot.on('managed_bot', async (ctx) => {
  const { managed_bot } = ctx.update.managed_bot;
  
  // Получить токен нового бота
  const response = await ctx.telegram.callApi('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  console.log(`Новый бот: @${managed_bot.username}`);
  console.log(`Токен: ${response.token}`);
});
```

---

## 🔗 Включите межботовую коммуникацию

1. В @BotFather: **Настройки бота** → **Bot-to-Bot коммуникация**
2. Включите режим

Теперь боты могут общаться в группах через:
- Команды с упоминанием: `/help@OtherBot`
- Прямые ответы на сообщения ботов

---

## 🤖 Подключите AI через MCP

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

## 📋 Что дальше?

| Задача | Гайд |
|--------|------|
| Построить дашборд | [Mini Apps](/docs/ru/mini-apps) |
| Масштабировать нагрузку | [Высокие нагрузки](/docs/ru/high-load) |
| Добавить агентов | [Оркестрация агентов](/docs/ru/multi-agent) |

---

::: tip Нужна помощь?
Смотрите [FAQ](/docs/ru/faq) или создайте issue на [GitHub](https://github.com/homgorn/bot-to-bot-telegram/issues)
:::