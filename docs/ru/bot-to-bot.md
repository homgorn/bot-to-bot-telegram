---
title: Руководство по Bot-to-Bot коммуникации - Bot-to-Bot Telegram
description: Полное руководство по межботовой коммуникации Telegram. Узнайте, как включить общение ботов в группах, предотвратить бесконечные циклы и построить мультибот рабочие процессы.
head:
  - - meta
    - name: keywords
      content: Межботовая коммуникация Telegram, общение ботов в группах, защита от бесконечных циклов, режим Bot-to-Bot, мультибот рабочие процессы
  - - meta
    - name: robots
      content: index, follow
---

# Руководство по Bot-to-Bot коммуникации

## Полное руководство по межботовой коммуникации Telegram (Апрель 2026)

### Содержание

1. [Обзор](#обзор)
2. [Включение режима Bot-to-Bot](#включение-режима-bot-to-bot)
3. [Коммуникация в группах](#коммуникация-в-группах)
4. [Коммуникация через Business Accounts](#коммуникация-через-business-accounts)
5. [Предотвращение бесконечных циклов](#предотвращение-бесконечных-циклов)
6. [Сценарии использования](#сценарии-использования)
7. [Примеры кода](#примеры-кода)

---

## Обзор

### Что такое Bot-to-Bot коммуникация?

Telegram позволяет ботам взаимодействовать друг с другом в определенных контекстах:

- **Групповые чаты** - Боты могут взаимодействовать в одной группе
- **Business Accounts** - Боты могут отправлять сообщения через подключенные бизнес-аккаунты
- **Кросс-бот рабочие процессы** - Сложные агентные потоки между ботами

### Основные требования

1. **Режим Bot-to-Bot** должен быть включен в @BotFather
2. **Контекстная зависимость** - Коммуникация работает только в разрешенных контекстах
3. **Предотвращение циклов** - Необходимо реализовать защиту от бесконечных циклов

---

## Включение режима Bot-to-Bot

### Пошаговая инструкция

1. Откройте @BotFather
2. Выберите вашего бота
3. Перейдите в **Настройки бота** → **Bot-to-Bot коммуникация**
4. Включите "Режим Bot-to-Bot коммуникации"
5. Подтвердите действие

### Проверка

```javascript
// Проверить включен ли режим B2B
bot.on('message', async (ctx) => {
  const botInfo = await ctx.bot.getMe();
  console.log('Может присоединяться к группам:', botInfo.can_join_groups);
  console.log('Может читать все сообщения группы:', botInfo.can_read_all_group_messages);
});
```

---

## Коммуникация в группах

### Как это работает

В групповых чатах боты могут общаться когда:

1. **Упоминание команды** - `/command@OtherBot`
2. **Ответ** - Ответить напрямую на сообщение бота
3. **Права администратора** - Бот имеет права администратора в группе
4. **Отключенная конфиденциальность** - Бот отключил режим групповой конфиденциальности

### Требования для получения сообщений

| Условие | Бот получает сообщения |
|---------|------------------------|
| Хотя бы один бот включил B2B | Да, с упоминанием/ответом |
| Бот администратор в группе | Да, все сообщения |
| Бот отключил групповую конфиденциальность | Да, все сообщения |

### Пример: Процесс проверки кода

```javascript
const reviewerBot = new Telegraf(process.env.REVIEWER_BOT_TOKEN);
const contributorBot = new Telegraf(process.env.CONTRIBUTOR_BOT_TOKEN);

// Бот-контрибьютор запрашивает ревью
contributorBot.command('review', async (ctx) => {
  const code = ctx.message.text.replace('/review', '').trim();
  
  // Отправить ревьюеру через упоминание в группе
  await ctx.telegram.sendMessage(
    GROUP_ID,
    `🔍 Запрошен код-ревью:\n\`\`\`\n${code}\n\`\`\``,
    { parse_mode: 'Markdown' }
  );
});

// Ревьюер обрабатывает и отвечает
reviewerBot.on('message', async (ctx) => {
  if (ctx.message.text.includes('код-ревью')) {
    const feedback = await analyzeCode(ctx.message.text);
    
    await ctx.telegram.sendMessage(
      GROUP_ID,
      `✅ Ревью завершено:\n${feedback}`,
      { reply_to_message_id: ctx.message.message_id }
    );
  }
});
```

---

## Коммуникация через Business Accounts

### Требования для настройки

1. Подключить бота к бизнес-аккаунту через **Chat Access Mode**
2. Включить режим Bot-to-Bot Communication на отправляющем боте
3. Оба бота должны принадлежать одному бизнес-аккаунту

### Как это работает

```
Бот А (с включенным B2B) → Business Account → Бот Б (тот же бизнес-аккаунт)
```

### Пример: Рабочий процесс поддержки

```javascript
// Бот поддержки отправляет боту внутри того же бизнес-аккаунта
async function escalateToSpecialist(supportBot, ticketId, issue) {
  // Получить бота-специалиста через бизнес-аккаунт
  const specialistBot = await getSpecialistBotForCategory(issue.category);
  
  // Отправить через Business API
  await supportBot.telegram.callApi('sendMessage', {
    chat_id: specialistBot.id,
    text: `🎫 Новый тикет #${ticketId}\n\n${issue.description}`,
    parse_mode: 'HTML'
  });
}
```

---

## Предотвращение бесконечных циклов

### Почему это важно

Межботовая коммуникация может легко привести к бесконечным циклам:

```
Бот А → Сообщение → Бот Б → Ответ → Бот А → Ответ → Бот Б → ...
```

### Необходимые меры защиты

#### 1. Дедупликация повторяющихся сообщений

```javascript
const messageCache = new LRUCache({ max: 1000 });

bot.on('message', async (ctx) => {
  const messageKey = `${ctx.from.id}:${ctx.message.text}`;
  
  if (messageCache.has(messageKey)) {
    console.log('Обнаружен дубликат сообщения, пропускаем');
    return;
  }
  
  messageCache.set(messageKey, Date.now());
  // Обработать сообщение...
});
```

#### 2. Ограничение частоты

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
    return; // Пропустить если превышен лимит
  }
  // Обработать сообщение...
});
```

#### 3. Максимальная глубина взаимодействия

```javascript
const MAX_DEPTH = 5;
const interactionDepth = new Map();

async function processWithDepth(ctx, depth = 0) {
  if (depth >= MAX_DEPTH) {
    console.log('Достигнута максимальная глубина, останавливаем');
    return;
  }
  
  // Обработать и потенциально вызвать другого бота
  const result = await doProcessing(ctx);
  
  if (result.needsAnotherBot) {
    await processWithDepth(ctx, depth + 1);
  }
}
```

#### 4. Глобальный таймаут

```javascript
const activeConversations = new Map();

bot.on('message', async (ctx) => {
  const conversationId = getConversationId(ctx);
  const startTime = activeConversations.get(conversationId);
  
  // Проверить, не выполняется ли диалог слишком долго
  if (startTime && Date.now() - startTime > 300000) { // 5 минут
    console.log('Таймаут диалога, прерываем');
    activeConversations.delete(conversationId);
    return;
  }
  
  if (!startTime) {
    activeConversations.set(conversationId, Date.now());
  }
  
  // Обработать сообщение...
});
```

### Полный пример защиты от циклов

```javascript
class BotCommunicationGuard {
  constructor(options = {}) {
    this.maxDepth = options.maxDepth || 5;
    this.maxMessagesPerMinute = options.maxMessagesPerMinute || 30;
    this.conversationTimeout = options.conversationTimeout || 300000; // 5 мин
    
    this.messageCache = new LRUCache({ max: 1000 });
    this.rateLimits = new Map();
    this.conversations = new Map();
  }
  
  canProcess(message) {
    const { chatId, userId, text } = message;
    
    // 1. Проверить дедупликацию
    const messageKey = `${chatId}:${userId}:${text}`;
    if (this.messageCache.has(messageKey)) {
      return { allowed: false, reason: 'duplicate' };
    }
    this.messageCache.set(messageKey, Date.now());
    
    // 2. Проверить лимит частоты
    const lastMessage = this.rateLimits.get(chatId) || 0;
    const now = Date.now();
    if (now - lastMessage < 60000 / this.maxMessagesPerMinute) {
      return { allowed: false, reason: 'rate_limit' };
    }
    this.rateLimits.set(chatId, now);
    
    // 3. Проверить таймаут диалога
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

// Использование
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
    console.log(`Сообщение заблокировано: ${check.reason}`);
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

## Сценарии использования

### Сценарий 1: Система проверки кода

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Контрибьютор   │ ───▶ │   Код-ревью     │ ───▶ │    Линтер       │
│    Бот          │      │      Бот        │      │     Бот         │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                        │                        │
         │                        ▼                        │
         │                  ┌─────────────────┐            │
         └─────────────────▶│   Групповой чат  │◀───────────┘
                            └─────────────────┘
```

### Сценарий 2: Мультиагентная поддержка клиентов

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Бот-триаж     │ ───▶ │   FAQ Бот       │ ───▶ │  Бот-эскалация  │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Сценарий 3: Конвейер создания контента

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Исследование  │ ───▶ │    Писатель     │ ───▶ │    Издатель     │
│     Бот         │      │      Бот        │      │      Бот        │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Примеры кода

### Пример 1: Коммуникация в групповом чате (Telegraf)

```javascript
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Включить режим bot-to-bot
bot.on('message', async (ctx) => {
  // Проверить, что сообщение от бота
  if (ctx.message.from.is_bot) {
    console.log('Получено сообщение от бота:', ctx.message.from.username);
    
    // Обработать и потенциально ответить
    const response = await processBotMessage(ctx.message);
    
    if (response) {
      await ctx.reply(response, {
        reply_to_message_id: ctx.message.message_id
      });
    }
  }
});

// Обработка команд с @ упоминанием
bot.on('edited_message', async (ctx) => {
  if (ctx.editedMessage.text.includes('@YourBot')) {
    await ctx.reply('Вижу, вы отредактировали сообщение, где упомянули меня!');
  }
});

bot.launch();
```

### Пример 2: Оркестрация нескольких ботов (Python/aiogram)

```python
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
import asyncio

# Инициализировать несколько ботов
bots = {
    'research': Bot(token=os.getenv('RESEARCH_BOT_TOKEN')),
    'analyzer': Bot(token=os.getenv('ANALYZER_BOT_TOKEN')),
    'writer': Bot(token=os.getenv('WRITER_BOT_TOKEN'))
}

dp = Dispatcher()

async def orchestrate_task(user_request: str):
    """Оркестрировать задачу между несколькими ботами"""
    
    # Шаг 1: Исследование
    research_result = await bots['research'].send_message(
        chat_id=os.getenv('ORCHESTRATION_GROUP'),
        text=f"🔍 Исследование: {user_request}"
    )
    
    # Подождать обработку исследовательским ботом
    await asyncio.sleep(2)
    
    # Шаг 2: Анализ
    analyzer_result = await bots['analyzer'].send_message(
        chat_id=os.getenv('ORCHESTRATION_GROUP'),
        text=f"📊 Анализ результатов исследования"
    )
    
    # Шаг 3: Написание
    writer_result = await bots['writer'].send_message(
        chat_id=os.getenv('ORCHESTRATION_GROUP'),
        text=f"✍️ Создать финальный результат"
    )
    
    return "Задача выполнена несколькими агентами"

@dp.message(Command("orchestrate"))
async def cmd_orchestrate(message: Message):
    task = message.text.replace('/orchestrate', '').strip()
    result = await orchestrate_task(task)
    await message.answer(result)

if __name__ == "__main__":
    dp.run_polling(bots['research'])
```

### Пример 3: Коммуникация через Business Account

```javascript
// Подключить боты к одному бизнес-аккаунту
const supportBot = new Telegraf(process.env.SUPPORT_BOT_TOKEN);
const specialistBot = new Telegraf(process.env.SPECIALIST_BOT_TOKEN);

// Включить Chat Access Mode на обоих ботах через @BotFather

// Поддержка эскалирует специалисту
async function escalateToSpecialist(ticketId, issue) {
  // Использовать API бизнес-аккаунта для отправки специалисту
  await supportBot.telegram.callApi('sendMessage', {
    chat_id: specialistBot.botInfo.id, // Должен быть тот же бизнес-аккаунт
    text: `🎫 Эскалация #${ticketId}\n\n${issue}`,
    parse_mode: 'HTML'
  });
}

// Специалист получает и обрабатывает
specialistBot.on('message', async (ctx) => {
  if (ctx.message.text.startsWith('🎫 Эскалация')) {
    await processEscalation(ctx.message.text);
    await ctx.reply('Эскалация получена и обрабатывается...');
  }
});

bot.launch();
```

---

## Лучшие практики

1. **Всегда реализуйте защиту от циклов** - Требуется для продакшена
2. **Используйте права администратора стратегически** - Дает доступ ко всем сообщениям группы
3. **Отключайте групповую конфиденциальность только когда нужно** - Соображения безопасности
4. **Мониторьте частоту сообщений** - Раннее обнаружение потенциальных циклов
5. **Логируйте все межботовые взаимодействия** - Для отладки и аналитики

---

## Ресурсы

- [Telegram Bot-to-Bot коммуникация](https://core.telegram.org/bots/features#bot-to-bot-communication)
- [Документация Bot API](https://core.telegram.org/bots/api)
- [Документация aiogram](https://docs.aiogram.dev/)

---

**Последнее обновление:** 18 апреля 2026
**Версия:** 1.0.0