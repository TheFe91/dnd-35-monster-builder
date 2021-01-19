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
  channel.send('HELP HERE');
};

const dispatchBotCommand = (channel, content) => {
  const parts = content.split(' ');
  const command = parts[0];
  switch (command) {
    case '!help':
      printHelp(channel);
      break;
    default:
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
