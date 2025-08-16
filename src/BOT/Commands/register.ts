import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../entities/User";

export default {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Create a Core account!")
    .addStringOption((opt) =>
      opt.setName("username").setDescription("Username").setRequired(true)
    )
    .addStringOption((opt) =>
      opt.setName("email").setDescription("Email").setRequired(true)
    )
    .addStringOption((opt) =>
      opt.setName("password").setDescription("Password").setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const username = interaction.options.getString("username", true);
    const emailInput = interaction.options.getString("email", true);
    const passwordInput = interaction.options.getString("password", true);

    const email = emailInput;
    const rawPassword = passwordInput;

    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const accountId = uuidv4().replace(/-/g, "");

    const exist = await User.findOne({ where: { id: interaction.user.id } });
    if (exist) {
      return interaction.reply({
        content: "You already have an account. Please delete in via /delete!",
        ephemeral: true,
      });
    }

    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return interaction.reply({
        content: "Username is already being used.",
        ephemeral: true,
      });
    }

    try {
      await User.create({
        id: accountId,
        username,
        password: hashedPassword,
        vbucks: 0,
      }).save();

      const embed = new EmbedBuilder()
        .setTitle("Welcome to Core!")
        .setDescription(
          `Welcome **${username}**! Your account has been created.`
        )
        .addFields(
          { name: "Email", value: email, inline: true },
          { name: "Account ID", value: accountId, inline: true }
        )
        .setColor("#00FF99")
        .setTimestamp()
        .setFooter({
          text: "Core Backend",
        });

      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: "Could not make your account, please contact support!",
        ephemeral: true,
      });
    }
  },
};
