import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder().setName('greet').setDescription('인사');

async function execute(interaction) {
  const greeting = '안녕하세요!';

  await interaction.reply(`${greeting}`);
}

export default { data, execute };
