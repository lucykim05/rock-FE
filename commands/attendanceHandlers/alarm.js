import { scheduleJob } from 'node-schedule';
import dotenv from 'dotenv';
import { client } from '../../index.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';
import { ATTENDANCE } from '../../constants/messages.js';

dotenv.config();

const channel_id = process.env.ATTENDANCE_CHANNEL_ID;
const time = process.env.ATTENDANCE_ALARM_TIME;

const job = scheduleJob(time, async () => {
  const channel = client.channels.cache.get(channel_id);

  if (!channel) {
    console.error(ATTENDANCE.NO_CHANNEL);
    return;
  }

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('출석')
      .setLabel('출석')
      .setStyle(ButtonStyle.Primary)
  );

  // 메세지 내부에 임베드(박스) 생성
  const embed = new EmbedBuilder()
    .setTitle('출석 체크')
    .setDescription(ATTENDANCE.BUTTON_MESSAGE);

  await channel.send({ embeds: [embed], components: [row] });
  console.log('출석 버튼 전송 완료');
});
