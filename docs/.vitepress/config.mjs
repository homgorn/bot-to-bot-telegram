import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default defineConfig({
  title: 'Bot-to-Bot Telegram',
  description: 'Multi-Agent AI Platform for Telegram with Managed Bots, Bot-to-Bot Communication, MCP Integration, and High-Load Architecture',
  lang: 'en-US',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'canonical', href: 'https://homgorn.github.io/bot-to-bot-telegram/docs/' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://homgorn.github.io/bot-to-bot-telegram/docs/' }],
    ['meta', { property: 'og:title', content: 'Bot-to-Bot Telegram - Multi-Agent AI Platform' }],
    ['meta', { property: 'og:description', content: 'Create and manage AI agents in Telegram with Managed Bots, Bot-to-Bot Communication, and MCP Integration' }],
    ['meta', { property: 'og:image', content: 'https://homgorn.github.io/bot-to-bot-telegram/docs/og-image.png' }],
    
    // Twitter
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: 'https://homgorn.github.io/bot-to-bot-telegram/docs/' }],
    ['meta', { property: 'twitter:title', content: 'Bot-to-Bot Telegram - Multi-Agent AI Platform' }],
    ['meta', { property: 'twitter:description', content: 'Create and manage AI agents in Telegram with Managed Bots, Bot-to-Bot Communication, and MCP Integration' }],
    ['meta', { property: 'twitter:image', content: 'https://homgorn.github.io/bot-to-bot-telegram/docs/og-image.png' }],
    
    // Schema.org Organization
    ['script', { type: 'application/ld+json', children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bot-to-Bot Telegram",
      "description": "Multi-Agent AI Platform for Telegram",
      "url": "https://homgorn.github.io/bot-to-bot-telegram/",
      "sameAs": [
        "https://github.com/homgorn/bot-to-bot-telegram"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "technical-support",
        "url": "https://github.com/homgorn/bot-to-bot-telegram/issues"
      }
    })}],
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' },
      { text: 'API', link: '/api-reference' },
      { 
        text: 'Languages',
        items: [
          { text: 'English', link: '/getting-started' },
          { text: 'Русский', link: '/ru/getting-started' }
        ]
      }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/getting-started' },
            { text: 'Installation', link: '/installation' },
            { text: 'Quick Start', link: '/quick-start' },
          ]
        },
        {
          text: 'Core Features',
          collapsed: false,
          items: [
            { text: 'Managed Bots', link: '/managed-bots' },
            { text: 'Bot-to-Bot Communication', link: '/bot-to-bot' },
            { text: 'Multi-Agent Orchestration', link: '/multi-agent' },
          ]
        },
        {
          text: 'Integrations',
          collapsed: false,
          items: [
            { text: 'MCP Integration', link: '/mcp-integration' },
            { text: 'Telegram Mini Apps', link: '/mini-apps' },
            { text: 'High-Load Architecture', link: '/high-load' },
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'API Reference', link: '/api-reference' },
            { text: 'Architecture', link: '/architecture' },
            { text: 'Roadmap', link: '/roadmap' },
            { text: 'FAQ', link: '/faq' },
            { text: 'How-To Guides', link: '/howto' },
          ]
        }
      ],
      '/ru/': [
        {
          text: 'Начало работы',
          collapsed: false,
          items: [
            { text: 'Введение', link: '/ru/getting-started' },
            { text: 'Установка', link: '/ru/installation' },
            { text: 'Быстрый старт', link: '/ru/quick-start' },
          ]
        },
        {
          text: 'Основные функции',
          collapsed: false,
          items: [
            { text: 'Managed Bots', link: '/ru/managed-bots' },
            { text: 'Bot-to-Bot коммуникация', link: '/ru/bot-to-bot' },
            { text: 'Оркестрация агентов', link: '/ru/multi-agent' },
          ]
        },
        {
          text: 'Интеграции',
          collapsed: false,
          items: [
            { text: 'MCP интеграция', link: '/ru/mcp-integration' },
            { text: 'Telegram Mini Apps', link: '/ru/mini-apps' },
            { text: 'Высокие нагрузки', link: '/ru/high-load' },
          ]
        },
        {
          text: 'Справочник',
          collapsed: false,
          items: [
            { text: 'API Reference', link: '/ru/api-reference' },
            { text: 'Архитектура', link: '/ru/architecture' },
            { text: 'План развития', link: '/ru/roadmap' },
            { text: 'FAQ', link: '/ru/faq' },
            { text: 'How-To гайды', link: '/ru/howto' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/homgorn/bot-to-bot-telegram' }
    ],

    search: {
      provider: 'local'
    },

    outline: 'deep',
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Bot-to-Bot Telegram'
    }
  },
  
  lastUpdated: true,
  cleanUrls: true,
})