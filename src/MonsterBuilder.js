import Discord from 'discord.js';
import { incomingMessageCallback, log } from './Utils';

const token = process.env.BOT_TOKEN;
const bot = new Discord.Client();

bot.login(token).then(null);

bot.on('ready', () => {
  log('Logged in as Monster Builder');
});

bot.on('message', (message) => {
  const { channel: { guild: isGuild } } = message;

  if (!isGuild) {
    const { author: { bot: isBot, username }, content } = message;
    if (!isBot) {
      log(`${username} says: ${content.toLowerCase().trim()}`);
    }
    incomingMessageCallback(message);
  } else {
    const { user: { id: botId } } = bot;
    const { mentions: { users } } = message;
    const isBotMentioned = users.has(botId);

    if (isBotMentioned) {
      incomingMessageCallback(message);
    }
  }
});
