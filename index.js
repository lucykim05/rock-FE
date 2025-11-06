// Require the necessary discord.js classes

const { token } = require('./config.json');

require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const pool = require('./db/database.js');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const CHANNEL_ID = process.env.CHANNEL_ID;

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  try {
    const result = await pool.query('SELECT current_database()');
    console.log('DB 연결 성공', result.rows[0].current_database);
  } catch (error) {
    console.error('DB 연결 실패', error);
  }
});

// Log in to Discord with your client's token
client.login(token);
