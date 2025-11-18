import { SlashCommandBuilder } from "discord.js";
import { funnyQuotes } from "../constants/funnyQuotes.js";

export default {
  data: new SlashCommandBuilder()
    .setName("오늘의유머")
    .setDescription("개발자 마님을 위해 돌쇠가 준비한 회심의 유머...!"),
  async execute(interaction) {
    const quoteLength = funnyQuotes.length;
    const randNum = Math.floor(Math.random() * quoteLength);
    const msg = "```" + funnyQuotes[randNum] + "\n```"; //명언을 블록으로 감싸는 형식

    await interaction.reply(msg);
  },
};
