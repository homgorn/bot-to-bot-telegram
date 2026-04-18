---
title: Руководство по Managed Bots API - Bot-to-Bot Telegram
description: Полное руководство по API Managed Bots Telegram (Bot API 9.6). Узнайте, как программно создавать, управлять и контролировать ботов Telegram. Пошаговые уроки и примеры кода.
head:
  - - meta
    - name: keywords
      content: API управляемых ботов Telegram, Bot API 9.6, getManagedBotToken, создать бота Telegram программно, режим управления ботами, токены ботов, жизненный цикл managed bot
  - - meta
    - name: robots
      content: index, follow
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Руководство по Managed Bots API","description":"Полное руководство по API Managed Bots Telegram (Bot API 9.6). Программное создание и управление ботами.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/ru/managed-bots","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"}}'
---

# Руководство по Managed Bots API

## Полное руководство по Telegram Managed Bots (Bot API 9.6, Апрель 2026)

### Содержание

1. [Обзор](#обзор)
2. [Включение Managed Bots](#включение-managed-bots)
3. [Создание Managed Bots](#создание-managed-bots)
4. [Управление токенами ботов](#управление-токенами-ботов)
5. [Жизненный цикл бота](#жизненный-цикл-бота)
6. [Пользовательский опыт](#пользовательский-опыт)
7. [Безопасность](#безопасность)
8. [Сценарии использования](#сценарии-использования)
9. [Примеры кода](#примеры-кода)

---

## Обзор

### Что такое Managed Bots?

Managed Bots позволяют вашему боту создавать и управлять другими ботами от имени пользователей. Это позволяет:

- **Создание ботов пользователями** - Пользователи могут создавать персональных AI агентов, бизнес-боты, игры
- **Программное управление** - Полный API контроль над созданными ботами
- **Бесшовный UX** - Пользователи создают ботов не выходя из Telegram

### Версия Bot API

Это руководство охватывает **Bot API 9.6** (Апрель 2026), который включает:
- Тип обновления `managed_bot`
- Метод `getManagedBotToken`
- Расширенные возможности управления ботами

---

## Включение Managed Bots

### Шаг 1: Выбор или создание Manager Bot

1. Откройте @BotFather
2. Создайте нового бота: `/newbot` или выберите из списка
3. Запомните username бота (например, `ManagerBot`)

### Шаг 2: Включение режима управления ботами

1. В @BotFather выберите вашего бота
2. Перейдите: **Настройки бота** → **Режим управления ботами**
3. Включите "Режим управления ботами"
4. Подтвердите действие

### Шаг 3: Проверка конфигурации

```bash
# Тест через Bot API
curl "https://api.telegram.org/bot<TOKEN>/getMe"
```

Вы должны увидеть вашего бота с дополнительными возможностями.

---

## Создание Managed Bots

### Метод 1: Прямая ссылка для создания

Сгенерируйте ссылку для пользователей:

```
https://t.me/newbot/{manager_bot_username}/{new_username}?name={new_name}
```

#### Параметры URL

| Параметр | Обязательно | Описание |
|-----------|-------------|----------|
| `manager_bot_username` | Да | Username вашего manager бота |
| `new_username` | Нет | Предложенный username бота |
| `new_name` | Нет | Предложенное отображаемое имя |

#### Пример ссылки

```
https://t.me/newbot/ManagerBot/CoolAIAgentBot?name=Cool+AI+Agent
```

Когда пользователь откроет эту ссылку, он увидит:
- Предзаполненный @username (редактируемый)
- Предзаполненное имя (редактируемое)
- Кнопку подтверждения

### Метод 2: Программное создание

Обработайте обновление `managed_bot` после подтверждения создания:

```javascript
// Пример на aiogram 3.x
bot.on('managed_bot', async (ctx) => {
  const { managed_bot, user } = ctx.update.managed_bot;
  
  console.log(`Создан новый бот: ${managed_bot.name}`);
  console.log(`Создал: ${user.first_name}`);
  
  // Получить токен бота
  const response = await ctx.api.call('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  const botToken = response.token;
  // Безопасно сохраните токен!
});
```

---

## Управление токенами ботов

### Получение токена бота

```typescript
interface GetManagedBotTokenParams {
  managed_bot_id: number;
}

interface GetManagedBotTokenResponse {
  success: boolean;
  token: string; // Токен доступа бота
}
```

### Использование токена

```javascript
// Создать экземпляр бота с новым токеном
const newBot = new Telegraf(newBotToken);

// Настроить нового бота
newBot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать в вашего нового AI Агента!');
});

// Запустить бота
newBot.launch();
```

### Хранение токенов

```typescript
interface TokenStorage {
  async store(botId: string, token: string): Promise<void>;
  async get(botId: string): Promise<string>;
  async delete(botId: string): Promise<void>;
  async rotate(botId: string): Promise<string>;
}

// Пример зашифрованного хранилища
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

## Жизненный цикл бота

### Этапы жизненного цикла

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Created   │ ──▶ │  Configured │ ──▶ │   Active    │ ──▶ │   Deleted   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Описание этапов

| Этап | Описание | Действия |
|-------|----------|----------|
| Created | Бот создан через подтверждение ссылки | Получить токен, инициализировать |
| Configured | Настройки бота применены | Установить команды, описание |
| Active | Бот запущен и отвечает | Обрабатывать сообщения |
| Deleted | Бот удален | Отозвать токен, очистка |

### Параметры конфигурации

```typescript
interface BotConfiguration {
  // Профиль бота
  name: string;           // Отображаемое имя
  username: string;      // @username
  description: string;    // Описание бота
  about: string;          // Текст "О боте"
  
  // Команды
  commands: BotCommand[]; // Список команд
  
  // Настройки
  privacy: boolean;       // Режим конфиденциальности
  attachments: boolean;    // Меню вложений
  
  // Медиа
  avatar?: Buffer;        // Фото профиля
}
```

---

## Пользовательский опыт

### Процесс создания

```
1. Пользователь получает ссылку (в чате, канале, сайте)
         │
         ▼
2. Пользователь нажимает ссылку → Открывается Telegram mini-app
         │
         ▼
3. Предзаполненная форма: username + имя (редактируемо)
         │
         ▼
4. Пользователь нажимает "Создать бота"
         │
         ▼
5. Система создает бота, получает токен
         │
         ▼
6. Manager бот получает обновление managed_bot
         │
         ▼
7. Пользователь видит сообщение об успехе со ссылкой на бота
```

### Пользовательский интерфейс

```javascript
// Отправить подтверждение создания с inline клавиатурой
await ctx.reply(
  '🎉 Ваш бот создан!',
  {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Открыть бота', url: `t.me/${botUsername}` }],
        [{ text: 'Настроить', callback_data: `config_${botId}` }]
      ]
    }
  }
);
```

---

## Безопасность

### Необходимые меры защиты

1. **Безопасность токенов**
   - Шифровать токены при хранении
   - Использовать безопасное хранилище (Vault, зашифрованная БД)
   - Реализовать ротацию токенов

2. **Валидация пользователя**
   - Проверять личность пользователя перед созданием бота
   - Реализовывать ограничения скорости для каждого пользователя
   - Добавлять капчу для защиты от спама

3. **Предотвращение бесконечных циклов**
   ```javascript
   // Реализация ограничения глубины
   const MAX_DEPTH = 5;
   const activeChats = new Map();
   
   bot.on('message', async (ctx) => {
     const chatId = ctx.message.chat.id;
     const currentDepth = activeChats.get(chatId) || 0;
     
     if (currentDepth >= MAX_DEPTH) {
       return; // Остановить обработку
     }
     
     activeChats.set(chatId, currentDepth + 1);
     
     try {
       await processMessage(ctx);
     } finally {
       activeChats.set(chatId, currentDepth);
     }
   });
   ```

4. **Ограничение частоты**
   - Ограничения для каждого пользователя
   - Глобальные ограничения для API вызовов
   - Обработка Retry-After

---

## Сценарии использования

### Сценарий 1: Платформа AI агентов

```
Пользователи могут создавать персональных AI агентов с пользовательскими промптами.
Каждый бот работает на базе AI (через интеграцию MCP).
```

```javascript
// Настройка AI агента для нового бота
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

### Сценарий 2: Маркетплейс бизнес-ботов

```
Готовые боты для распространенных бизнес-потребностей:
- Поддержка клиентов
- Отслеживание заказов
- Запись на прием
```

### Сценарий 3: Игровая платформа

```
Пользователи создают игровые боты для:
- Викторины
- Квизы
- Интерактивные приключения
```

### Сценарий 4: Инструменты продуктивности

```
Персональные ассистенты продуктивности:
- Управление задачами
- Заметки
- Интеграция с календарем
```

---

## Примеры кода

### Пример 1: Полный Manager Bot (Node.js/Telegraf)

```javascript
const { Telegraf, Markup } = require('telegraf');
const crypto = require('crypto');

const bot = new Telegraf(process.env.MANAGER_BOT_TOKEN);

// Храните токены безопасно (используйте зашифрованное хранилище в продакшене)
const botTokens = new Map();

// Обработка /start - показать кнопку создания бота
bot.command('start', async (ctx) => {
  const link = generateManagedBotLink('ManagerBot', '', '');
  
  await ctx.reply(
    '🤖 Создайте своего персонального AI бота',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Создать бота', link)]
    ])
  );
});

// Обработка обновления managed_bot
bot.on('managed_bot', async (ctx) => {
  const { managed_bot, user } = ctx.update.managed_bot;
  
  // Получить токен бота
  const response = await ctx.telegram.callApi('getManagedBotToken', {
    managed_bot_id: managed_bot.id
  });
  
  const token = response.token;
  
  // Безопасно сохранить токен
  botTokens.set(managed_bot.id.toString(), token);
  
  // Инициализировать нового бота
  await initializeNewBot(token, managed_bot);
  
  // Уведомить пользователя
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
  
  // Установить описание бота
  await newBot.telegram.setDescription(
    `Personal AI Agent - Created for ${botInfo.name}`
  );
  
  // Установить команды
  await newBot.telegram.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Get help' },
    { command: 'ai', description: 'Ask AI' }
  ]);
  
  // Обработка сообщений
  newBot.on('message', async (ctx) => {
    await ctx.reply('AI Agent думает...');
    // Добавьте интеграцию с AI здесь
  });
  
  // Запуск
  newBot.launch();
}

bot.launch();
```

### Пример 2: Manager Bot (Python/aiogram)

```python
from aiogram import Bot, Dispatcher, F
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import Command
import os

TOKEN = os.getenv("MANAGER_BOT_TOKEN")

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

# Храните токены в базе данных (используйте зашифрованное хранилище в продакшене)
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
    
    # Получить токен бота
    response = await bot.call_api('getManagedBotToken', {
        'managed_bot_id': bot_id
    })
    
    token = response.get('token')
    bot_tokens[bot_id] = token
    
    # Инициализировать нового бота
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
    
    # Добавьте обработчики сообщений
    # ...

if __name__ == "__main__":
    dp.run_polling(bot)
```

---

## Справочник API

### Обновление Managed Bot

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

### Методы

| Метод | Описание |
|-------|----------|
| `getManagedBotToken` | Получить токен доступа для управляемого бота |
| `setChatMenuButton` | Настроить кнопку меню |
| `setMyCommands` | Установить команды бота |
| `setDescription` | Установить описание бота |
| `setAbout` | Установить текст "О боте" |

---

## Лучшие практики

1. **Онбординг пользователя**
   - Показывайте четкие инструкции
   - Предоставляйте примеры
   - Ограничивайте скорость создания ботов

2. **Конфигурация бота**
   - Устанавливайте команды по умолчанию
   - Настраивайте приветственное сообщение
   - Добавляйте бота в группы по умолчанию

3. **Обработка ошибок**
   - Корректно обрабатывайте ошибки создания
   - Предоставляйте понятные сообщения об ошибках
   - Реализуйте логику повторных попыток

4. **Мониторинг**
   - Отслеживайте скорость создания ботов
   - Следите за активными ботами
   - Логируйте использование токенов

---

## Ресурсы

- [Документация Telegram Managed Bots](https://core.telegram.org/bots/features#managed-bots)
- [Справочник Bot API](https://core.telegram.org/bots/api)
- [Документация aiogram](https://docs.aiogram.dev/)
- [Документация Telegraf](https://telegraf.js.org/)

---

**Последнее обновление:** 18 апреля 2026
**Версия:** 1.0.0