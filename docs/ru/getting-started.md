---
title: Начало работы - Платформа Bot-to-Bot Telegram
description: Узнайте, как создавать мультиагентные AI системы в Telegram с Managed Bots, межботовой коммуникацией и MCP интеграцией. Пошаговое руководство для разработчиков.
head:
  - - meta
    - name: keywords
      content: Управляемые боты Telegram, Межботовая коммуникация Telegram, Мультиагентный AI, MCP интеграция, Telegram Bot API 9.6, Платформа AI агентов, Telegram Mini Apps
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: article:section
      content: Документация
  - - meta
    - property: article:published_time
      content: 2026-04-18
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Начало работы с Bot-to-Bot Telegram","description":"Узнайте, как создавать мультиагентные AI системы в Telegram с Managed Bots и MCP интеграцией.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/ru/getting-started","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"},"programmingLanguage":["JavaScript","Python"]}'
---

# Начало работы с Bot-to-Bot Telegram

## Введение

Добро пожаловать на платформу **Bot-to-Bot Telegram** — комплексное решение для создания мультиагентных AI систем в Telegram. Это руководство поможет понять возможности платформы и быстро начать работу.

### Что такое Bot-to-Bot Telegram?

Bot-to-Bot Telegram — это платформа, позволяющая разработчикам создавать сложные AI-боты со следующими возможностями:

- **Managed Bots** - Программное создание и управление ботами Telegram
- **Межботовая коммуникация** - Общение ботов в группах
- **Оркестрация мультиагентов** - Координация нескольких AI агентов
- **MCP интеграция** - Подключение к AI моделям через Model Context Protocol
- **Высоконагруженная архитектура** - Масштабирование для миллионов сообщений

::: tip Быстрый факт
Платформа поддерживает **Telegram Bot API 9.6** (апрель 2026) с полной поддержкой Managed Bots.
:::

---

## Предварительные требования

Перед началом убедитесь, что у вас есть:

| Требование | Описание |
|------------|----------|
| Node.js 18+ или Python 3.10+ | Среда выполнения |
| Аккаунт Telegram | Для создания ботов |
| Доступ к @BotFather | Для создания и настройки ботов |
| Git | Для контроля версий |

---

## Установка

### Шаг 1: Клонировать репозиторий

```bash
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram
```

### Шаг 2: Установить зависимости

```bash
# Для Node.js
npm install

# Для Python
pip install -r requirements.txt
```

### Шаг 3: Настроить окружение

```bash
cp .env.example .env
```

Отредактируйте `.env` с вашим токеном Telegram бота:

```env
BOT_TOKEN=ваш_telegram_bot_token_here
MANAGER_BOT_USERNAME=YourManagerBot
```

---

## Быстрый старт

### Создайте своего первого Managed Bot

1. **Включите режим Managed Bots** в @BotFather:
   - Выберите вашего бота
   - Перейдите в **Настройки бота** → **Режим управления ботами**
   - Включите "Режим управления ботами"

2. **Запустите Manager Bot**:

```bash
npm run dev
```

3. **Поделитесь ссылкой создания** с пользователями:

```
https://t.me/newbot/YourBotUsername?name=My+AI+Bot
```

Когда пользователи откроют эту ссылку, они смогут создавать своих собственных ботов, которыми вы управляете!

---

## Основные концепции

### Managed Bots

Managed Bots позволяют вашему боту программно создавать других ботов. Каждый созданный бот может быть настроен и управляться через API.

### Межботовая коммуникация

Боты могут общаться друг с другом в группах когда:
- Хотя бы один бот включил режим Bot-to-Bot
- Используются упоминания команд (`/command@OtherBot`) или ответы

### Мультиагентные системы

Оркестрируйте несколько AI агентов, работающих вместе:
- **Агент-исследователь** - Собирает информацию
- **Агент-аналитик** - Обрабатывает данные
- **Агент-писатель** - Создает контент
- **Агент-публикатор** - Распространяет результат

---

## Следующие шаги

Готовы погрузиться глубже? Изучите эти руководства:

| Руководство | Описание |
|-------------|----------|
| [Managed Bots Guide](/docs/ru/managed-bots) | Полная API документация |
| [Межботовая коммуникация](/docs/ru/bot-to-bot) | Общение между ботами |
| [Оркестрация агентов](/docs/ru/multi-agent) | Координация агентов |
| [MCP интеграция](/docs/ru/mcp-integration) | Подключение AI моделей |
| [FAQ](/docs/ru/faq) | Частые вопросы |

---

## Поддержка

- **GitHub Issues**: [Сообщить об ошибках](https://github.com/homgorn/bot-to-bot-telegram/issues)
- **Документация**: [Полные docs](/docs/ru/architecture)
- **Discord**: Присоединяйтесь к сообществу

::: info Нужна помощь?
Смотрите наши [How-To гайды](/docs/ru/howto) для пошаговых уроков.
:::