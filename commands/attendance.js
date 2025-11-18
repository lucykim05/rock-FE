import { SlashCommandBuilder } from 'discord.js';
import { checkAttendance } from './attendanceHandlers/check.js';
import { getAttendanceStats } from './attendanceHandlers/stats.js';
import { getAttendanceRanking } from './attendanceHandlers/ranking.js';

import { isAdmin } from '../utils/authority.js';
import { setAttendanceChannel } from './settingHandlers/setAttendanceChannel.js';

import { ATTENDANCE } from '../constants/messages.js';


export default {
  data: new SlashCommandBuilder()
    .setName("출석")
    .setDescription("출석 관련 명령어")
    .addSubcommand((subcommand) =>
      subcommand.setName("체크").setDescription("오늘의 출석을 체크합니다")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("현황").setDescription("출석 현황을 확인합니다")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("순위").setDescription("출석 순위를 확인합니다.")
    ),

  async execute(interaction) {
    const attendanceChannelId = process.env.ATTENDANCE_CHANNEL_ID;

    if (interaction.channelId !== attendanceChannelId) {
      await interaction.reply(ATTENDANCE.CHECK_CHANNEL_ID);
      return;
    }

    const subcommand = interaction.options.getSubcommand();


    if (subcommand === '출석설정') {
      if (!isAdmin(interaction)) {
        return interaction.reply('이 기능은 관리자만 사용 가능합니다.');
      }
      await setAttendanceChannel(interaction);
      return;
    }

    if (subcommand === '체크') {

      await checkAttendance(interaction);
    } else if (subcommand === "현황") {
      await getAttendanceStats(interaction);
    } else if (subcommand === "순위") {
      await getAttendanceRanking(interaction);
    }
  },
};
