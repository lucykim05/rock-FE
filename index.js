import fs from 'fs'; //events 폴더나 commands 폴더를 fs로 읽어와야 봇 실행 시 리스너 등록 가능
import path from 'path'; //폴더나 파일 경로가 있어야 가져오기 가능
import { pathToFileURL } from 'url';
import 'dotenv/config';
import {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
} from 'discord.js';

import { scheduleManager } from './events/alarm/schedule.js';


const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// 새로운 클라이언트 인스턴스 생성 = 봇
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

//client(봇)에게 슬래쉬 명령어들을 저장할 수 있는 Collection 달아주기
// Collection은 discordJS에서 선언된 타입 -> documentation 확인해보기
client.commands = new Collection();

//__dirname은 CJS에서는 지원했지만 esm에서는 하지 않기 때문에 별도로 선언해줘야 함
const __dirname = import.meta.dirname;
//commands 파일경로
const commandsPath = path.join(__dirname, 'commands');
//events 파일 내부에 .js로 끝나는 파일 전부 읽어서 저장
const commandFilesDir = await fs.promises.readdir(commandsPath);
const commandFiles = commandFilesDir.filter((file) => file.endsWith('.js'));

const commands = [];

//commands 파일에서 읽은 슬래쉬 명령어들을 위의 commands 배열에 저장
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const fileURL = pathToFileURL(filePath);

  const commandModule = await import(fileURL);
  const command = commandModule.default;
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON()); // 명령어 배포(등록)
    client.commands.set(command.data.name, command); //execute(실행) 함수 client(봇)에게 저장. 이 부분이 있어야 실행 가능
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// REST 모듈을 통해 명령어를 등록하는 과정
const rest = new REST().setToken(token);
(async () => {
  try {
    console.log(`${commands.length}개의 [슬래쉬 명령어] 초기화 중 . . .`);
    //put을 통해 현재 시점의 슬래쉬 명령어 리프레싱
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log(`${data.length}개의 [슬래쉬 명령어]를 무사히 등록했습니다!`);
  } catch (error) {
    console.error(error);
  }
})();

//이벤트 핸들러 등록
//events 파일경로
const eventsPath = path.join(__dirname, 'events');
//events 파일 내부에 .js로 끝나는 파일 전부 읽어서 저장
const eventFilesDir = await fs.promises.readdir(eventsPath);
const eventFiles = eventFilesDir.filter((file) => file.endsWith('.js'));

/*
모든 이벤트 파일에 대해 해당 파일의 이벤트 리스너를 봇(client)에 등록하는 과정
import에 await가 필요한 이유는 cjs의 require는 동기식으로 작동하지만 esm의 import는 비동기 식이라 가져오는 것을 기다려줘야 함

require와 달리 fileURL을 import 해서 가져오는 건 객체 전체가 담기기 때문에 내부에 여러 속성들이 존재함. 
하지만 우리는 export default를 한 함수만 필요함 -> 따라서 eventModul.default를 통해 event로 저장
*/
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const fileURL = pathToFileURL(filePath);

  const eventModule = await import(fileURL);
  const event = eventModule.default;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// 봇 로그인 후 예약된 메세지(스케쥴) 로드
client.once('clientReady', async () => {
  console.log(`봇이 준비되었습니다: ${client.user.tag}`);
  await scheduleManager.loadSchedules(guildId);
});

// 클라이언트 토큰을 갖고 봇 로그인
client.login(token);
