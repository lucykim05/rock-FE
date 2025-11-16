import { SlashCommandBuilder } from "discord.js";
import {
  getDailyStudyTime,
  getMonthlyStudyTime,
} from "./studyTimeHandlers/getStudyTime.js ";

export default {
  data: new SlashCommandBuilder()
    .setName("공부시간")
    .setDescription("측정한 공부시간을 확인할 수 있는 명령어")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("-하루")
        .setDescription("오늘의 공부시간을 확인합니다.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("-일주일")
        .setDescription("일주일 동안의 공부시간을 확인합니다.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("-한달")
        .setDescription("한 달 간의 공부시간을 확인합니다.")
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    if (subCommand === "-하루") {
      await getDailyStudyTime(interaction);
    } else if (subCommand === "-일주일") {
    } else if (subCommand === "-한달") {
      await getMonthlyStudyTime(interaction);
    }
  },
};
