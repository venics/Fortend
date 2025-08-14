import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.example.env' });

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.user?.setActivity('Fortnite', { type: ActivityType.Playing });
});

export const startDiscordBot = () => {
  if (process.env.bot_token) {
    client.login(process.env.bot_token);
  } else {
    console.error('Bot token not found. Please add it to your .env file.');
  }
};
