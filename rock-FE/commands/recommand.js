import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  data: new SlashCommandBuilder()
    .setName('백준문제추천')
    .setDescription('백준 문제를 추천합니다.')
    .addStringOption((option) =>
      option
        .setName('난이도')
        .setDescription('브론즈, 실버, 골드, 플레, 다이아')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('태그')
        .setDescription('dp, greedy, 구현 등')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('언어')
        .setDescription('문제 언어 설정')
        .setRequired(false)
        .addChoices(
          { name: '한국어만', value: 'korean' },
          { name: '모든 언어 허용', value: 'all' }
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const difficulty = interaction.options.getString('난이도');
    const tag = interaction.options.getString('태그');
    const language = interaction.options.getString('언어');

    const query = setQuery(difficulty, tag);

    try {
      let items = await getProblems(query);
      items = filterByLanguage(items, language);

      if (!items.length) {
        return interaction.editReply('조건에 맞는 문제가 없습니다요!');
      }

      const embed = createEmbed(items[0]);
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply('추천 중 오류가 발생했슈!');
    }
  },
};

const tierRange = {
  브론즈: '1..5',
  실버: '6..10',
  골드: '11..15',
  플레: '16..20',
  다이아: '21..25',
};

// 필터링할 쿼리 세팅
function setQuery(difficulty, tag) {
  let query = '';
  if (difficulty && tierRange[difficulty])
    query += `tier:${tierRange[difficulty]} `;
  if (tag) query += `tag:${tag} `;
  if (!query) query = 'tier:6..15';
  return query.trim();
}

// 필터링해서 문제 가져오기
async function getProblems(query) {
  const response = await fetch(
    `https://solved.ac/api/v3/search/problem?query=${encodeURIComponent(
      query
    )}&sort=random`
  );
  const data = await response.json();
  return data.items;
}

// 한국어 설정이면 한국어만
function filterByLanguage(items, language) {
  if (language === 'korean') {
    return items.filter((item) => /[가-힣]/.test(item.titleKo));
  }
  return items;
}

function createEmbed(problem) {
  return new EmbedBuilder()
    .setTitle(`${problem.problemId} - ${problem.titleKo}`)
    .setURL(`https://www.acmicpc.net/problem/${problem.problemId}`)
    .setDescription(problem.tags.map((x) => x.displayNames[0].name).join(', '))
    .addFields({
      name: '난이도',
      value: problem.level.toString(),
      inline: true,
    });
}
