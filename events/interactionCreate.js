import { Events, MessageFlags } from "discord.js";

//이 코드가 있어야 슬래쉬 명령어 실행되는 이벤트 처리 가능(= 슬래쉬 명령어 행동 가능)
export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
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
          content: "해당 명령어 실행 중 오류가 발생했습니다!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "해당 명령어 실행 중 오류가 발생했습니다!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
