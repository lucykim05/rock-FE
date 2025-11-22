import { supabase } from "../database/supabaseClient.js";

export const getUserInfo = async (hasFetchedUser) => {
  const accessToken = localStorage.getItem("discord_access_token");
  if (!accessToken || hasFetchedUser.current) return;

  hasFetchedUser.current = true;
  try {
    const { data, error } = await supabase.functions.invoke("get-userInfo", {
      body: { accessToken },
    });

    if (error) throw Error(error);

    console.log("사용자 데이터 가져오기 성공!");
    return data;
  } catch (error) {
    console.log("데이터 가져오기 실패 : ", error);
    return;
  }
};
