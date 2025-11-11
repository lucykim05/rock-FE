import { SlashCommandBuilder } from 'discord.js';
import { checkAttendance } from './attendanceHandlers/check.js';
import { getAttendanceStats } from './attendanceHandlers/stats.js';

export default {
  data: new SlashCommandBuilder()
    .setName('출석')
    .setDescription('출석 관련 명령어')
    .addSubcommand((subcommand) =>
      subcommand.setName('체크').setDescription('오늘의 출석을 체크합니다')
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('통계').setDescription('출석 현황을 확인합니다')
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === '체크') {
      await checkAttendance(interaction);
    } else if (subcommand === '통계') {
      await getAttendanceStats(interaction);
    }
  },
};
