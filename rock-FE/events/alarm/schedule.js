import { scheduleJob } from 'node-schedule';
import { client } from '../../index.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';
import { ATTENDANCE } from '../../constants/messages.js';
import pool from '../../db/database.js';
import { SCHEDULE_QUERIES } from '../../db/queries/schedule.js';

export const scheduleManager = {
  scheduledJobs: new Map(),

  async setupAttendance(guildId) {
    try {
      // 기존 스케쥴 취소
      if (this.scheduledJobs.has(guildId)) {
        this.scheduledJobs.get(guildId).cancel();
        console.log(`[${guildId}] 기존 스케줄 취소됨`);
      }

      const timeSetting = await pool.query(SCHEDULE_QUERIES.GET_TIME, [
        guildId,
      ]);

      if (timeSetting.rows.length === 0) {
        console.log(`[${guildId}] 설정이 없습니다.`);
        return;
      }

      const { attendance_channel_id, attendance_time } = timeSetting.rows[0];
      if (!attendance_time) {
        console.error(`[${guildId}] attendance_time이 없습니다.`);
        return;
      }

      // 디버깅 로그 추가
      console.log(`[${guildId}] 스케줄 설정 시도:`);
      console.log(`  - 채널 ID: ${attendance_channel_id}`);
      console.log(`  - 시간 설정: ${attendance_time}`);
      console.log(
        `  - 현재 서버 시간: ${new Date().toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        })}`
      );

      const job = scheduleJob(attendance_time, async () => {
        console.log(
          `[${guildId}] 출석 알림 실행 - ${new Date().toLocaleString('ko-KR')}`
        );

        const channel = client.channels.cache.get(attendance_channel_id);

        if (!channel) {
          console.error(`[${guildId}] ${ATTENDANCE.NO_CHANNEL}`);
          return;
        }

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('출석')
            .setLabel('출석')
            .setStyle(ButtonStyle.Primary)
        );

        const embed = new EmbedBuilder()
          .setTitle('출석 체크')
          .setDescription(ATTENDANCE.BUTTON_MESSAGE);

        await channel.send({ embeds: [embed], components: [row] });
        console.log(`[${guildId}] 출석 버튼 전송 완료`);
      });

      if (job) {
        this.scheduledJobs.set(guildId, job);
        console.log(`[${guildId}] 스케줄 등록 완료`);
        console.log(`[${guildId}] 다음 실행 예정: ${job.nextInvocation()}`);
      } else {
        console.error(`[${guildId}] 스케줄 등록 실패 - job이 null입니다`);
      }
    } catch (error) {
      console.error(`[${guildId}] 스케쥴 설정 오류:`, error);
    }
  },

  async initializeAllSchedules() {
    try {
      const result = await pool.query(SCHEDULE_QUERIES.GET_ID);
      console.log(`총 ${result.rows.length}개 서버의 스케줄 초기화 시작`);

      for (const row of result.rows) {
        await this.setupAttendance(row.guild_id);
      }

      console.log('모든 스케줄 초기화 완료');
    } catch (error) {
      console.error('스케쥴 초기화 오류:', error);
    }
  },

  async loadSchedules(guildId) {
    if (guildId) {
      await this.setupAttendance(guildId);
    } else {
      await this.initializeAllSchedules();
    }
  },
};
