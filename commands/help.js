import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { HELP_MESSAGE } from "../constants/messages.js";

export default {
  data: new SlashCommandBuilder()
    .setName("도움말")
    .setDescription("돌쇠 사용법을 알아봅시다!"),
  async execute(interaction) {
    // ✅ 이렇게 보내야 링크가 작동해유!
    const embed = new EmbedBuilder()
      .setDescription(HELP_MESSAGE)
      .setColor(0xbfeaea);

    await interaction.reply({ embeds: [embed] });
  },
};
