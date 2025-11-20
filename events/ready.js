import { Events } from 'discord.js';
import { registerMembers } from '../utils/registerMembers.js';
import { scheduleManager } from './alarm/schedule.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      console.log(`Ready! Logged in as ${client.user.tag}`);

      for (const [guildId, guild] of client.guilds.cache) {
        console.log(`길드: ${guild.name} (${guildId})`);

        // 각 길드별로 멤버 등록
        await registerMembers(client, guildId);

        // 각 길드별로 스케줄 로드
        await scheduleManager.loadSchedules(guildId);
      }
      console.log('멤버 등록 완료');
    } catch (error) {
      console.error('멤버 등록 실패', error);
    }
  },
};
