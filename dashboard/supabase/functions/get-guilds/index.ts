import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 유저 토큰
    const { accessToken } = await req.json();

    // supabase에 저장된 봇 토큰
    const botToken = Deno.env.get("DISCORD_BOT_TOKEN");

    // 유저의 서버 목록 가져오기
    const userRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userRes.ok) throw await userRes.json();
    const userGuilds = await userRes.json();

    // 봇의 서버 목록 가져오기
    const botRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bot ${botToken}` },
    });
    if (!botRes.ok) throw await botRes.json();
    const botGuilds = await botRes.json();

    // 봇이 있는 서버들의 ID만 따로 모아서 집합으로 생성
    const botGuildIds = new Set(botGuilds.map((g: any) => g.id));

    // 유저 서버 중에서 봇 있는 곳만 남김
    const commonGuilds = userGuilds.filter((guild: any) => botGuildIds.has(guild.id));

    return new Response(JSON.stringify(commonGuilds), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
