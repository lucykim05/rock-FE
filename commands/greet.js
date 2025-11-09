import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("인사")
    .setDescription("돌쇠에게 인사를 받아봅시다!"),
  async execute(interaction) {
    await interaction.reply("안녕하세요 마님! 오늘도 즐거운 개발 되세요 :)");
  },
};
