---
title: Telegram Mini Apps Development Guide - Bot-to-Bot Telegram
description: Complete guide to Telegram Mini Apps development. Build web dashboards that run inside Telegram with native UX, payments, and secure authentication.
head:
  - - meta
    - name: keywords
      content: Telegram Mini Apps, Telegram Web App, TMA development, Telegram dashboard, Telegram web app SDK, Telegram payments, initData authentication, Telegram Mini App deployment
  - - meta
    - name: robots
      content: index, follow
  - - script
    - type: application/ld+json
      children: '{"@context":"https://schema.org","@type":"TechArticle","headline":"Telegram Mini Apps Development Guide","description":"Build web dashboards that run inside Telegram with native UX and payments.","url":"https://homgorn.github.io/bot-to-bot-telegram/docs/mini-apps","publisher":{"@type":"Organization","name":"Bot-to-Bot Telegram"}}'
---

# Telegram Mini Apps Development Guide

## Complete Guide to Building Mini Apps (April 2026)

### Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [SDK Integration](#sdk-integration)
4. [Authentication](#authentication)
5. [UI Components](#ui-components)
6. [Payments](#payments)
7. [Deployment](#deployment)

---

## Overview

### What are Mini Apps?

Telegram Mini Apps are web applications that run directly inside Telegram, providing native-like experiences without requiring app store installation.

### Capabilities

- Full-screen immersive UI
- Access to Telegram SDK features
- Secure authentication via initData
- Payment integration
- Haptic feedback
- Theme integration

---

## Getting Started

### Create Project

```bash
npm create @telegram-apps/mini-app@latest ./my-app
# or
pnpm create @telegram-apps/mini-app@latest ./my-app
```

### Project Structure

```
my-app/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── index.html
├── package.json
└── vite.config.ts
```

---

## SDK Integration

### Install SDK

```bash
npm install @tma.js/sdk
```

### Initialize

```typescript
import { init, retrieveLaunchParams } from '@tma.js/sdk';

const { initData, themeParams, ... } = retrieveLaunchParams();

// Initialize SDK
const sdk = init();

console.log('User:', sdk.initDataUnsafe.user);
console.log('Theme:', themeParams);
```

---

## Authentication

### Validate InitData

```typescript
import { createHmac } from 'crypto';

function validateInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash')!;
  params.delete('hash');
  
  const dataCheckString = [...params.entries()]
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  
  const hmac = createHmac('sha256', botToken);
  hmac.update(dataCheckString);
  
  return hmac.digest('hex') === hash;
}
```

---

## UI Components

### Main Button

```typescript
const mainButton = sdk.MainButton;

mainButton.setText('Buy Now');
mainButton.onClick(() => {
  // Handle click
});
mainButton.show();
```

### Back Button

```typescript
const backButton = sdk.BackButton;

backButton.onClick(() => {
  history.back();
});
backButton.show();
```

---

## Payments

### Accept Payments

```typescript
// Send invoice
await bot.telegram.sendInvoice(
  chat_id,
  {
    title: 'Premium Subscription',
    description: '1 month premium access',
    payload: 'premium_monthly',
    provider_token: process.env.STRIPE_TOKEN,
    currency: 'XTR', // Telegram Stars
    prices: [{ label: 'Premium', amount: 100 }]
  }
);
```

---

## Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Configure Domain in BotFather

```
/setdomain
Enter your domain: my-app.vercel.app
```

---

**Last Updated:** April 18, 2026