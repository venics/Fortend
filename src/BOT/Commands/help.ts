import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Collection,
} from "discord.js";
import { client } from "..";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lists all available commands."),

  async execute(interaction: ChatInputCommandInteraction) {
    const commands = (client as any).commands as Collection<string, any>;

    const embed = new EmbedBuilder()
      .setTitle("Fortend Bot Commands")
      .setDescription("Here is a list of all available commands:")
      .setColor("#00FF99");

    commands.forEach((command) => {
      embed.addFields({
        name: `/${command.data.name}`,
        value: command.data.description,
      });
    });

    return await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
