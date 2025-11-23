import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('대시보드')
    .setDescription('대시보드를 확인해보세요!'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          title: '대시보드 열기',
          description: '위의 링크를 클릭하고, 로그인 해주세요!',
          url: 'https://following-brena-rock-fe-6070e56e.koyeb.app/',
          color: 0x00ff00,
        },
      ],
    });
  },
};
