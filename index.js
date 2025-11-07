import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import pool from "./db/database.js";

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  try {
    const result = await pool.query("SELECT current_database()");
    console.log("DB 연결 성공", result.rows[0].current_database);
  } catch (error) {
    console.error("DB 연결 실패", error);
  }
});

// Log in to Discord with your client's token
client.login(token);
