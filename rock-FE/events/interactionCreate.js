import { Events, MessageFlags } from 'discord.js';
import { checkAttendance } from '../commands/attendanceHandlers/check.js';

//이 코드가 있어야 슬래쉬 명령어 실행되는 이벤트 처리 가능(= 슬래쉬 명령어 행동 가능)
export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // interaction이 버튼이면(출석) 출석 체크 command 실행
    if (interaction.isButton()) {
      if (interaction.customId === '출석') {
        try {
          await checkAttendance(interaction);
        } catch (error) {
          console.error(error);
          await interaction.reply('출석 체크 알림 실패');
        }
      }
    }

    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `${interaction.commandName}라는 명령어를 찾을 수 없습니다.`
      );
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '해당 명령어 실행 중 오류가 발생했습니다!',
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: '해당 명령어 실행 중 오류가 발생했습니다!',
          flags: MessageFlags.Ephemeral,
        });
      }
      return;
    }
    if (interaction.isButton()) {
      if (interaction.customId === 'attendance_check') {
        await checkAttendance(interaction);
      }
    }
  },
};
