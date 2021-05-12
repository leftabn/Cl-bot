const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config();

class claBot {
  constructor(client) {
    this.client = client;
    this.countTossiu = 0;
    this.tiltMap = new Map();
    this.prefix = ';';
  }

  login(token) {
    this.client.login(token);
  }

  start() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    })
  }

  _listener() {
    /**
     * @TODO
     * CLEAR COMMAND
    */
    this.client.on('message', msg => {
      const tmpMsg = msg.content.toLowerCase();
      const msgSplit = tmpMsg.split(' ');
      const prefix = msgSplit[0][0];
      const msgFirst = msgSplit[0].substring(1);
      const channelId = msg.channel.id;
      const channel = client.channels.cache.get(channelId);
      if (prefix === this.prefix) {
        if (msgFirst === 'tossiu') {
          msg.reply(`Theus tossiu ${++this.countTossiu} vezes`);
        }
        else if (msgFirst === 'tilt') {
          let key;
          try {
            key = msg.mentions.users.entries().next().value[0];
          }
          catch {
            key = msg.author.id;
          }
          const consult = this.tiltMap[key];
          if (consult) {
            this.tiltMap[key]++;
          }
          else {
            this.tiltMap[key] = 1;
          }
          channel.send(`<@${key}> tiltou ${this.tiltMap[key]} vezes.`);
        }
        else if (msgFirst === 'onlaine') {
          const attach = new MessageAttachment('src/assets/onlaine.png');
          channel.send(attach);
        }
        else if (msgFirst === 'prefix') {
          this.prefix = msgSplit[1];
        }
      }
      else {
        if (tmpMsg.includes('um like')) msg.react('👍');
      }
    });
  }
}


(function main() {
  const bot = new claBot(client);
  bot.login(process.env.TOKEN);
  bot.start();
  bot._listener();
})();