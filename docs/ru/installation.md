---
title: Установка - Bot-to-Bot Telegram
description: Руководство по установке платформы Bot-to-Bot Telegram. Пошаговая настройка для Node.js, Python, Docker и облачного деплоя.
head:
  - - meta
    - name: keywords
      content: Установка Telegram бота, установка aiogram, установка Telegraf, Docker telegram бот, деплой telegram бота, настройка Telegram бота Node.js, настройка Telegram бота Python
  - - meta
    - name: robots
      content: index, follow
---

# Установка

Полное руководство по установке платформы Bot-to-Bot Telegram.

## Требования

| Компонент | Минимальная версия |
|-----------|-------------------|
| Node.js | 18.x |
| Python | 3.10+ |
| PostgreSQL | 15.x |
| Redis | 7.x |
| Docker | 20.x+ |

---

## Установка Node.js

### Быстрая установка

```bash
# Клонировать репозиторий
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Установить зависимости
npm install

# Скопировать файл окружения
cp .env.example .env
```

### Настройка окружения

Отредактируйте файл `.env`:

```env
BOT_TOKEN=ваш_telegram_bot_token
MANAGER_BOT_USERNAME=YourBotUsername
DATABASE_URL=postgresql://user:pass@localhost:5432/botdb
REDIS_URL=redis://localhost:6379
```

### Запуск в режиме разработки

```bash
npm run dev
```

---

## Установка Python

### Использование pip

```bash
# Клонировать репозиторий
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Создать виртуальное окружение
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows

# Установить зависимости
pip install -r requirements.txt

# Скопировать файл окружения
copy .env.example .env
```

### Настройка и запуск

```bash
# Отредактируйте файл .env
python main.py
```

---

## Установка Docker

### Использование Docker Compose

```bash
# Клонировать и перейти в директорию
git clone https://github.com/homgorn/bot-to-bot-telegram.git
cd bot-to-bot-telegram

# Запустить все сервисы
docker-compose up -d
```

### Docker Compose файл

```yaml
version: '3.8'

services:
  bot:
    build: .
    ports:
      - "3000:3000"
    environment:
      - BOT_TOKEN=${BOT_TOKEN}
      - DATABASE_URL=postgresql://postgres:password@db:5432/bots
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: bots
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

---

## Облачный Деплой

### Vercel (Serverless)

```bash
# Установить Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

### Railway

```bash
# Установить Railway CLI
npm i -g @railway/cli

# Войти и инициализировать
railway login
railway init

# Деплой
railway up
```

### Render

1. Подключите GitHub репозиторий к Render
2. Установите переменные окружения
3. Деплой произойдет автоматически

---

## Проверка

### Тестирование установки

```bash
# Проверить работу бота
curl https://api.telegram.org/bot<TOKEN>/getMe

# Должен вернуть JSON с информацией о боте
```

### Проверка работоспособности

Отправьте `/start` вашему боту - вы должны получить приветственное сообщение.

---

## Следующие Шаги

- [Быстрый старт](/docs/ru/quick-start)
- [Настройка Managed Bots](/docs/ru/managed-bots)
- [Справочник конфигурации](/docs/ru/api-reference)

---

::: tip Нужна Помощь?
Смотрите [FAQ](/docs/ru/faq) или [How-To гайды](/docs/ru/howto).
:::