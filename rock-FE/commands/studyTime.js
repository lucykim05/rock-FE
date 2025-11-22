import { SlashCommandBuilder } from "discord.js";
import { getStudyTime } from "./studyTimeHandlers/getStudyTime.js ";

export default {
  data: new SlashCommandBuilder()
    .setName("공부시간")
    .setDescription("측정한 공부시간을 확인할 수 있는 명령어")
    .addStringOption((option) =>
      option
        .setName("기간")
        .setDescription("조회할 기간을 선택하세요.")
        .setRequired(true) //필수인지
        .addChoices(
          { name: "하루", value: "day" },
          { name: "일주일", value: "week" },
          { name: "한 달", value: "month" }
        )
    ),
  async execute(interaction) {
    const value = interaction.options.getString("기간");
    await getStudyTime(interaction, value);
  },
};
