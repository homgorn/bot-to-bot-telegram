require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const crypto = require('crypto');

const bot = new Telegraf(process.env.BOT_TOKEN);

// In-memory storage (use Redis/DB in production)
const botTokens = new Map();
const userBots = new Map();

// Rate limiting
const rateLimiter = new Map();
const MAX_DEPTH = 5;
const MAX_MESSAGES_PER_MINUTE = 30;

// Helper functions
function checkRateLimit(chatId) {
  const now = Date.now();
  const lastMessage = rateLimiter.get(chatId) || 0;
  if (now - lastMessage < 60000 / MAX_MESSAGES_PER_MINUTE) {
    return false;
  }
  rateLimiter.set(chatId, now);
  return true;
}

function generateManagedBotLink(managerUsername, suggestedUsername, suggestedName) {
  let link = `https://t.me/newbot/${managerUsername}`;
  if (suggestedUsername) link += `/${suggestedUsername}`;
  if (suggestedName) link += `?name=${encodeURIComponent(suggestedName)}`;
  return link;
}

// Bot command handlers
bot.command('start', async (ctx) => {
  const link = generateManagedBotLink(
    process.env.MANAGER_BOT_USERNAME || 'ManagerBot',
    '',
    ''
  );
  
  await ctx.reply(
    '🤖 Добро пожаловать в платформу Bot-to-Bot Telegram!\n\n' +
    'Создайте своего персонального AI бота для:\n' +
    '• AI агентов\n' +
    '• Бизнес-ботов\n' +
    '• Игр\n' +
    '• Инструментов продуктивности',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🎯 Создать бота', link)]
    ])
  );
});

bot.command('mybots', async (ctx) => {
  const userId = ctx.from.id;
  const bots = userBots.get(userId) || [];
  
  if (bots.length === 0) {
    await ctx.reply('У вас пока нет созданных ботов. Используйте /start для создания.');
    return;
  }
  
  const botList = bots.map(b => `• @${b.username} - ${b.name}`).join('\n');
  await ctx.reply(`Ваши боты:\n\n${botList}`);
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    '📖 *Доступные команды*\n\n' +
    '/start - Главное меню\n' +
    '/mybots - Ваши боты\n' +
    '/help - Помощь',
    { parse_mode: 'Markdown' }
  );
});

// Handle managed_bot update - this is where the magic happens!
bot.on('managed_bot', async (ctx) => {
  try {
    const { managed_bot, user } = ctx.update.managed_bot;
    
    console.log(`[Managed Bot] Created: @${managed_bot.username} by user ${user.id}`);
    
    // Get bot token via API
    const response = await ctx.telegram.callApi('getManagedBotToken', {
      managed_bot_id: managed_bot.id
    });
    
    const token = response.token;
    
    // Store token securely (encrypt in production!)
    botTokens.set(managed_bot.id.toString(), token);
    
    // Track user's bots
    const userBotList = userBots.get(user.id) || [];
    userBotList.push({
      id: managed_bot.id,
      username: managed_bot.username,
      name: managed_bot.first_name
    });
    userBots.set(user.id, userBotList);
    
    // Initialize the new bot with custom handlers
    await initializeNewBot(token, managed_bot);
    
    // Notify user
    await ctx.reply(
      `✅ *Бот успешно создан!*\n\n` +
      `Username: @${managed_bot.username}\n` +
      `Name: ${managed_bot.first_name}\n\n` +
      `Бот готов к использованию!`,
      { parse_mode: 'Markdown' }
    );
    
  } catch (error) {
    console.error('[Managed Bot Error]', error);
    await ctx.reply('❌ Произошла ошибка при создании бота. Попробуйте позже.');
  }
});

async function initializeNewBot(token, botInfo) {
  const newBot = new Telegraf(token);
  
  // Set bot description
  try {
    await newBot.telegram.setDescription(
      `Personal AI Agent - Создан ${botInfo.first_name}`
    );
    
    // Set bot commands
    await newBot.telegram.setMyCommands([
      { command: 'start', description: 'Запустить бота' },
      { command: 'help', description: 'Помощь' },
      { command: 'ping', description: 'Проверить работу' }
    ]);
    
    // Add message handler for the new bot
    newBot.on('message', async (ctx) => {
      if (!checkRateLimit(ctx.chat.id)) {
        return;
      }
      
      // Simple echo with AI processing placeholder
      await ctx.reply('🤖 Получено! Добавьте AI обработку здесь.');
    });
    
    // Launch the new bot
    newBot.launch();
    console.log(`[Bot] Launched @${botInfo.username}`);
    
  } catch (error) {
    console.error(`[Bot Init Error] @${botInfo.username}`, error);
  }
}

// Error handling
bot.catch((err, ctx) => {
  console.error('[Bot Error]', err);
  ctx.reply('❌ Произошла ошибка. Мы уже работаем над её исправлением.');
});

// Start the bot
console.log('[Bot] Starting manager bot...');
bot.launch();

process.once('SIGINT', () => {
  console.log('[Bot] Shutting down...');
  bot.stop();
});