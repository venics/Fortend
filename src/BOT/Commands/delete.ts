import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import User from "../../db/User";
import Profiles from "../../db/Profiles";
import Tournaments from "../../db/Tournaments";

export default {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Permanently delete your Fortend account and all associated data."),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const user = await User.findOne({ discordId: interaction.user.id });

      if (!user) {
        return interaction.reply({
          content: "You do not have an account to delete.",
          ephemeral: true,
        });
      }

      await User.deleteOne({ accountId: user.accountId });
      await Profiles.deleteOne({ accountId: user.accountId });
      await Tournaments.deleteOne({ accountId: user.accountId });

      const embed = new EmbedBuilder()
        .setTitle("Account Deleted")
        .setDescription("Your Fortend account and all associated data have been successfully deleted.")
        .setColor("Red")
        .setTimestamp();

      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (err) {
      console.error("Error during account deletion:", err);
      return await interaction.reply({
        content: "An error occurred while deleting your account. Please contact support.",
        ephemeral: true,
      });
    }
  },
};
