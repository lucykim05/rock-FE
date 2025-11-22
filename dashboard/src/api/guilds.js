import { supabase } from "../database/supabaseClient.js";

export const getGuildInfo = async (hasFetchedGuild) => {
  const accessToken = localStorage.getItem("discord_access_token");
  if (!accessToken || hasFetchedGuild.current) return;

  hasFetchedGuild.current = true;
  try {
    const { data, error } = await supabase.functions.invoke("get-guilds", {
      body: { accessToken },
    });

    if (error) throw Error(error);

    console.log("서버 데이터 가져오기 성공!");
    return data;
  } catch (error) {
    console.log("데이터 가져오기 실패 : ", error);
    return;
  }
};
