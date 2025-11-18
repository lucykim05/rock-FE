import { Events } from 'discord.js';
import { registerMembers } from '../utils/registerMembers.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      await registerMembers(client);
      console.log(`Ready! Logged in as ${client.user.tag}`);
      console.log('멤버 등록 완료');
    } catch (error) {
      console.error('멤버 등록 실패', error);
    }
  },
};
