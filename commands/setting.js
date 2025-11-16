import { SlashCommandBuilder } from 'discord.js';
import { isAdmin } from '../utils/authority.js';
import { setAttendanceChannel } from './settingHandlers/setAttendanceChannel.js';
import { setAttendanceTime } from './settingHandlers/setAttendanceTime.js';

export default {
  data: new SlashCommandBuilder()
    .setName('세팅')
    .setDescription('디스코드 봇 세팅 명령어')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('출석채널설정')
        .setDescription('[관리자 전용] 출석 전용 채널을 설정합니다.')
        .addChannelOption((option) =>
          option
            .setName('채널')
            .setDescription('출석 채널로 설정합니다.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('출석시간설정')
        .setDescription('[관리자 전용] 출석 버튼이 뜰 시간을 설정합니다.')
        .addIntegerOption((option) =>
          option
            .setName('시간')
            .setDescription('출석 버튼이 뜰 시간 (0-23, 예: 8 = 오전 8시)')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(23)
        )
    ),

  async execute(interaction) {
    // 모든 세팅 명령어는 관리자만 사용 가능
    if (!isAdmin(interaction)) {
      return interaction.reply('이 기능은 관리자만 사용 가능합니다.');
    }

    const subcommand = interaction.options.getSubcommand();

    if (subcommand === '출석채널설정') {
      await setAttendanceChannel(interaction);
    } else if (subcommand === '출석시간설정') {
      await setAttendanceTime(interaction);
    }
  },
};
