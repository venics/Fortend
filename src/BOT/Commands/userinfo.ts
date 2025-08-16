import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import User from "../../db/User";
import 'dotenv/config';

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about a user.")
    .addStringOption((opt) =>
      opt.setName("user").setDescription("The user's Discord ID").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    const adminIds = (process.env.ADMIN_DISCORD_IDS || '').split(',');
    if (!adminIds.includes(interaction.user.id)) {
      const embed = new EmbedBuilder()
        .setTitle("Core")
        .setDescription("You do not have permissions to use this command.")
        .setColor("Red")
        .setTimestamp();

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const discordId = interaction.options.getString("user", true);

    try {
      const user = await User.findOne({ discordId: discordId });

      if (!user) {
        return interaction.reply({
          content: "User not found.",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle(`User Info: ${user.username}`)
        .addFields(
          { name: "Account ID", value: user.accountId, inline: true },
          { name: "Username", value: user.username, inline: true },
          { name: "V-Bucks", value: user.vbucks.toString(), inline: true },
          { name: "Email", value: user.email, inline: true },
          { name: "Banned", value: user.banned.toString(), inline: true },
        )
        .setColor("#00FF99")
        .setTimestamp();

      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (err) {
      console.error("Error fetching user info:", err);
      return await interaction.reply({
        content: "Could not retrieve user info, please contact support!",
        ephemeral: true,
      });
    }
  },
};
