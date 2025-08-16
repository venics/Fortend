import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../../db/User";
import Profiles from "../../db/Profiles";
import Tournaments from "../../db/Tournaments";

// A placeholder for a function that would create the default user profiles
const createInitialProfiles = (accountId: string) => {
    return {
        "common_core": {
            "items": {
                "Currency:MtxPurchased": {
                    "templateId": "Currency:MtxPurchased",
                    "attributes": { "platform": "Epic" },
                    "quantity": 0
                }
            },
            "stats": { "attributes": { "mtx_purchase_history": {} } }
        },
        // Other profiles would be created here
    };
};

export default {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Create a Fortend account!")
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
    const email = interaction.options.getString("email", true);
    const password = interaction.options.getString("password", true);

    try {
        const existingUserByDiscordId = await User.findOne({ discordId: interaction.user.id });
        if (existingUserByDiscordId) {
            return interaction.reply({
                content: "You already have an account. Please use `/delete` first if you want a new one.",
                ephemeral: true,
            });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return interaction.reply({
                content: "That username is already taken.",
                ephemeral: true,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const accountId = uuidv4().replace(/-/g, "");

        await User.create({
            accountId,
            username,
            email,
            password: hashedPassword,
            discordId: interaction.user.id,
        });

        const userProfiles = createInitialProfiles(accountId);
        await Profiles.create({
            accountId,
            profile: userProfiles,
        });

        await Tournaments.create({ accountId });

        const embed = new EmbedBuilder()
            .setTitle("Welcome to Fortend!")
            .setDescription(`Your account, **${username}**, has been successfully created.`)
            .addFields(
                { name: "Email", value: email, inline: true },
                { name: "Account ID", value: accountId, inline: true }
            )
            .setColor("#00FF99")
            .setTimestamp()
            .setFooter({ text: "Fortend Backend" });

        return await interaction.reply({ embeds: [embed], ephemeral: true });

    } catch (err) {
        console.error("Error during registration:", err);
        return await interaction.reply({
            content: "An error occurred while creating your account. Please contact support.",
            ephemeral: true,
        });
    }
  },
};
