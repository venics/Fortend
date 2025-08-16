import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import User from "../../db/User";
import 'dotenv/config';

// Placeholder function for giving a full locker
const giveFullLocker = async (accountId: string) => {
  console.log(`Giving full locker to account ${accountId}`);
  // In a real implementation, this would involve complex logic
  // to add all cosmetics to the user's profile.
  return Promise.resolve();
};

export default {
  data: new SlashCommandBuilder()
    .setName("fulllocker")
    .setDescription("Give a user full locker!")
    .addStringOption((opt) =>
      opt.setName("user").setDescription("The user's Discord ID").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    const adminIds = (process.env.ADMIN_DISCORD_IDS || '').split(',');
    if (!adminIds.includes(interaction.user.id)) {
      const embed = new EmbedBuilder()
        .setTitle("Fortend")
        .setDescription("You do not have permissions to use this command.")
        .setColor("Red")
        .setTimestamp();

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const discordIdToGive = interaction.options.getString("user", true);
    try {
      const user = await User.findOne({ discordId: discordIdToGive });
      if (!user) {
        const embed = new EmbedBuilder()
          .setTitle("Fortend")
          .setDescription("Couldn't find the selected user.")
          .setColor("Red")
          .setTimestamp();

        return await interaction.reply({ embeds: [embed], ephemeral: true });
      }

      await giveFullLocker(user.accountId);

      const embed = new EmbedBuilder()
        .setTitle("Fortend")
        .setDescription(`Successfully gave Full Locker to ${user.username}!`)
        .setColor("Green")
        .setTimestamp();

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.error(err);

      const embed = new EmbedBuilder()
        .setTitle("Fortend")
        .setDescription(
          "We ran into an error while giving full locker, please try again later."
        )
        .setColor("Red")
        .setTimestamp();

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
