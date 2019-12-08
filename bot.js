const Discord = require('discord.js');
const axios = require('axios');
const auth = require('./auth.json');

const instance = axios.create({
  baseURL: 'https://api.twitch.tv/kraken/',
  timeout: 1000,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': auth.twitch_client_id
  }
});

// Initialize Discord Bot
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// TODO switch to ES6 so we can use async/await

// TODO function for translating username to user ID
// TODO make this function accept the user ID
const isKingOnline = (msg) => {
  instance.get('streams/29093531')
    .then(response => {
      if (response.stream !== null) {
        msg.reply("Alvin is online. https://twitch.tv/songmeister")
      } else {
        msg.reply("Alvin is not online :(")
      }
      return response
    })
    .catch(error => {
      console.log(error);
    });
}

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  if (msg.content === '!alvin') {
    streamStatus = isKingOnline(msg)
  }
});

client.login(auth.discord_token)