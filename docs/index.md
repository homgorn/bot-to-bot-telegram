---
layout: default
title: Bot to Bot Telegram | Seamless Bot Communication Framework
description: Уникальный open-source фреймворк для прямой связи Telegram ботов между собой. Bot-to-bot API, автоматизация, перелинковка.
keywords: telegram bot, bot to bot, bot communication, telegram api, автоматизация телеграм ботов, связь ботов
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Bot to Bot Telegram",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "description": "Framework for direct communication between Telegram bots.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>

<style>
  :root {
    --bg-main: #0d1117;
    --bg-card: #161b22;
    --text-main: #c9d1d9;
    --text-muted: #8b949e;
    --accent: #58a6ff;
    --accent-hover: #1f6feb;
    --border: #30363d;
  }
  body {
    background-color: var(--bg-main) !important;
    color: var(--text-main) !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin: 0; padding: 0; line-height: 1.6;
  }
  .landing-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
  .hero { text-align: center; padding: 4rem 0; border-bottom: 1px solid var(--border); }
  .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #fff; }
  .hero p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem; }
  .btn { display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: 0.2s; margin: 0 10px; }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent-hover); }
  .btn-outline { border: 1px solid var(--border); color: var(--text-main); }
  .btn-outline:hover { border-color: var(--text-main); }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 3rem 0; }
  .card { background: var(--bg-card); padding: 2rem; border: 1px solid var(--border); border-radius: 8px; }
  .card h3 { margin-top: 0; color: var(--accent); }
  .code-block { background: #010409; padding: 1rem; border-radius: 6px; overflow-x: auto; border: 1px solid var(--border); font-family: monospace; color: #e6edf3; }
  .faq-item { margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
  .lang-switch { position: fixed; top: 20px; right: 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 5px; z-index: 1000; cursor: pointer; }
  .lang-btn { background: transparent; border: none; color: var(--text-muted); padding: 5px 15px; border-radius: 15px; cursor: pointer; }
  .lang-btn.active { background: var(--accent); color: #fff; }
  /* i18n logic classes */
  .ru-content { display: none; }
  .en-content { display: block; }
  [data-lang="ru"] .ru-content { display: block; }
  [data-lang="ru"] .en-content { display: none; }
</style>

<div class="lang-switch" id="langSwitch">
  <button class="lang-btn active" onclick="setLang('en')">EN</button>
  <button class="lang-btn" onclick="setLang('ru')">RU</button>
</div>

<script>
  function setLang(lang) {
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    localStorage.setItem('botLang', lang);
  }
  // Auto-detect language
  window.onload = () => {
    const savedLang = localStorage.getItem('botLang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    setLang(savedLang);
    if(savedLang === 'ru') {
      document.querySelector('.lang-switch button:nth-child(2)').classList.add('active');
      document.querySelector('.lang-switch button:nth-child(1)').classList.remove('active');
    }
  };
</script>

<div class="landing-container">

  <section class="hero">
    <div class="en-content">
      <h1>Bot-to-Bot Telegram</h1>
      <p>The ultimate framework to connect, synchronize, and automate multiple Telegram bots seamlessly.</p>
      <a href="#how-to" class="btn btn-primary">Get Started</a>
      <a href="https://github.com/homgorn/bot-to-bot-telegram" class="btn btn-outline">View on GitHub</a>
    </div>
    <div class="ru-content">
      <h1>Bot-to-Bot Telegram</h1>
      <p>Мощный фреймворк для связи, синхронизации и автоматизации нескольких Telegram ботов.</p>
      <a href="#how-to" class="btn btn-primary">Быстрый старт</a>
      <a href="https://github.com/homgorn/bot-to-bot-telegram" class="btn btn-outline">Смотреть на GitHub</a>
    </div>
  </section>

  <section id="concept" style="margin-top: 3rem;">
    <div class="en-content">
      <h2>Core Entities & Architecture</h2>
      <p>Stop building isolated bots. <strong>Bot-to-Bot Telegram</strong> introduces a new paradigm where bots share states, relay messages, and act as a unified neural network.</p>
    </div>
    <div class="ru-content">
      <h2>Ключевые сущности и Архитектура</h2>
      <p>Хватит писать изолированных ботов. <strong>Bot-to-Bot Telegram</strong> предлагает новую парадигму: боты делятся стейтами, передают сообщения и работают как единая нейросеть.</p>
    </div>
  </section>

  <section class="grid-3">
    <div class="card">
      <h3 class="en-content">Secure Webhooks</h3>
      <h3 class="ru-content">Безопасные Вебхуки</h3>
      <p class="en-content">Encrypted data transfer between your bot instances using hidden endpoints.</p>
      <p class="ru-content">Зашифрованная передача данных между вашими ботами через скрытые эндпоинты.</p>
    </div>
    <div class="card">
      <h3 class="en-content">State Sync</h3>
      <h3 class="ru-content">Синхронизация Стейтов</h3>
      <p class="en-content">Automatically share Redis/DB context across multiple bot tokens.</p>
      <p class="ru-content">Автоматический шаринг контекста (Redis/БД) между разными токенами.</p>
    </div>
    <div class="card">
      <h3 class="en-content">Load Balancing</h3>
      <h3 class="ru-content">Балансировка</h3>
      <p class="en-content">Distribute heavy AI or scraping tasks from the main bot to worker bots.</p>
      <p class="ru-content">Делегирование тяжелых задач (ИИ, парсинг) от главного бота к воркерам.</p>
    </div>
  </section>

  <section id="how-to">
    <div class="en-content">
      <h2>How to Use (Quick Start)</h2>
      <p>Initialize the connection between Bot A and Bot B in just a few lines of code.</p>
    </div>
    <div class="ru-content">
      <h2>How-to: Быстрый старт</h2>
      <p>Настройте связь между Ботом А и Ботом Б всего в несколько строк кода.</p>
    </div>
    <div class="code-block">
// Initialize Hub
const BotHub = require('bot-to-bot-telegram');

const mainBot = new BotHub.Node('TOKEN_A', { role: 'master' });
const workerBot = new BotHub.Node('TOKEN_B', { role: 'worker' });

// Send payload across bots
mainBot.relayTo(workerBot, { 
    action: 'process_image', 
    payload: file_id 
});
    </div>
  </section>

  <section id="docs" class="grid-3" style="margin-top: 3rem;">
    <div class="card" style="border-color: var(--accent);">
      <h3 class="en-content">📚 Detailed How-To</h3>
      <h3 class="ru-content">📚 Подробные How-To</h3>
      <p class="en-content">Read our comprehensive guides on setup and scaling.</p>
      <p class="ru-content">Читайте полные гайды по настройке и масштабированию.</p>
      <a href="/how-to.html" style="color: var(--accent);">Read more &rarr;</a>
    </div>
    <div class="card" style="border-color: var(--accent);">
      <h3 class="en-content">🔑 Entities & Keys</h3>
      <h3 class="ru-content">🔑 Сущности и Ключи</h3>
      <p class="en-content">Understand API keys, webhooks, and routing entities.</p>
      <p class="ru-content">Разберитесь в API ключах, вебхуках и сущностях маршрутизации.</p>
      <a href="/entities.html" style="color: var(--accent);">Learn keys &rarr;</a>
    </div>
  </section>

  <section id="faq" style="margin-top: 4rem;">
    <h2 class="en-content">Frequently Asked Questions</h2>
    <h2 class="ru-content">ЧаВо (FAQ)</h2>
    
    <div class="faq-item">
      <strong><span class="en-content">Can I connect bots written in different languages (Python & Node.js)?</span><span class="ru-content">Можно ли связать ботов на разных языках (Python и Node.js)?</span></strong>
      <p><span class="en-content">Yes! The protocol uses language-agnostic HTTP/REST and WebSockets under the hood.</span><span class="ru-content">Да! Протокол использует универсальные HTTP/REST и WebSockets под капотом.</span></p>
    </div>
    <div class="faq-item">
      <strong><span class="en-content">Does this bypass Telegram API rate limits?</span><span class="ru-content">Обходит ли это лимиты Telegram API?</span></strong>
      <p><span class="en-content">No, it optimizes requests by distributing them across bots, but native TG limits still apply per bot token.</span><span class="ru-content">Нет, библиотека оптимизирует запросы, распределяя их по ботам, но нативные лимиты ТГ действуют для каждого токена.</span></p>
    </div>
  </section>

  <footer style="margin-top: 5rem; padding-top: 2rem; border-top: 1px solid var(--border); text-align: center; color: var(--text-muted);">
    <p>
      <span class="en-content">Built for the Telegram Developer Community. Open-source under MIT License.</span>
      <span class="ru-content">Создано для сообщества разработчиков Telegram. Open-source по лицензии MIT.</span>
    </p>
    <p style="font-size: 0.8rem;">
      SEO Tags: Telegram API wrapper, Bot network, multi-bot orchestration, bot-to-bot webhook.
    </p>
  </footer>

</div>
