import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { User } from "../../entities/User";

export default {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Delete your Core account."),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const user = await User.findOne({ where: { id: interaction.user.id } });

      if (!user) {
        return interaction.reply({
          content: "You do not have an account to delete.",
          ephemeral: true,
        });
      }

      await user.remove();

      const embed = new EmbedBuilder()
        .setTitle("Account Deleted")
        .setDescription("Your Core account has been successfully deleted.")
        .setColor("Red")
        .setTimestamp();

      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: "Could not delete your account, please contact support!",
        ephemeral: true,
      });
    }
  },
};
