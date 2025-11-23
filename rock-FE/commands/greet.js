import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("인사")
    .setDescription("돌쇠에게 인사를 받아볼까요?"),
  async execute(interaction) {
    await interaction.reply("지 그만 부르시구 코드나 완성하셔유");
  },
};
