import { Client, GatewayIntentBits, ActivityType, Collection } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
  presence: {
    activities: [{ name: `Core`, type: ActivityType.Watching }],
  },
});

const commands = new Collection<string, any>();

const loadCommands = async () => {
  const commandsPath = path.join(__dirname, 'Commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  const commandData = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;
    if ('data' in command && 'execute' in command) {
      commands.set(command.data.name, command);
      commandData.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  try {
    console.log(`Started refreshing ${commandData.length} application (/) commands.`);
    const data = await client.application?.commands.set(commandData);
    console.log(`Successfully reloaded ${data?.size} application (/) commands.`);
  } catch (error) {
    console.error(`Failed to register commands: ${error}`);
  }
};

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.on('ready', async () => {
  await loadCommands();
  console.log(`Logged in as ${client.user?.tag}`);
});

export const startBot = () => {
    const token = (process.env.BOT_TOKEN ?? "").trim();
    if (!token) {
        console.error("BOT_TOKEN not found in .env file. Bot will not start.");
        return;
    }
    client.login(token);
}
