const getDateTime = (withDate, withTime, timeWithSeconds = false) => {
  const date = new Date();
  let toReturn = '';
  if (withDate) {
    toReturn += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
  }
  if (withTime) {
    toReturn += `${date.getHours()}:${date.getMinutes()}${timeWithSeconds ? `:${date.getSeconds()}` : ''}`;
  }

  return toReturn;
};

const log = (message) => console.log(`${getDateTime(true, true)} - ${message}`);

const printHelp = (channel) => {
  channel.send(
    `
I will help you to generate a monster for a D&D 3.5 campaign.
Of course this I'm intended to be a DungeonMaster-only bot, but feel free to use me as you like.
All you have to do is just type \`!newmonster\` and follow the link that the I'll provide.
The monster so created will be available for you and for all the people using the Dungeons&Dragons Bot Suite 
    `,
  );
};

const dispatchBotCommand = (channel, content) => {
  const parts = content.split(' ');
  const command = parts[0];
  switch (command) {
    case '!help':
      printHelp(channel);
      break;
    default:
      channel.send(`I'm sorry, but "**${command}**" is an ***undefined*** command. Please, try again`);
      break;
  }
};

const removeMentions = (message) => {
  const { mentions: { users } } = message;
  const mentions = Array.from(users.keys());

  let content = message.content.toLowerCase().trim();

  mentions.forEach((mention) => {
    content = content.replace(`<@!${mention}>`, '');
  });

  return content.trim();
};

const incomingMessageCallback = (message) => {
  const { channel } = message;
  const cleanedContent = removeMentions(message);

  dispatchBotCommand(channel, cleanedContent);
};

export {
  incomingMessageCallback,
  log,
};
