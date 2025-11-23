import { supabase } from "../database/supabaseClient.js";

export const code2AccessToken = async (url, hasRequestedAccessToken) => {
  const urlParams = new URLSearchParams(url);
  const code = urlParams.get("code");

  //url에 code가 있고 아직 supabase에 요청을 안 했을 때만 실행
  if (code && !hasRequestedAccessToken.current) {
    try {
      hasRequestedAccessToken.current = true;
      //supabase의 discord-oauth 폴더의 index.ts 실행
      const { data, error } = await supabase.functions.invoke("discord-oauth", {
        body: { code },
      });

      if (error) throw Error(error);

      console.log("로그인 성공!");
      localStorage.setItem("discord_access_token", data.access_token);

      // 페이지를 새로고침 하지 않고 url에 code만 지운 상태로 변경
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    } catch (error) {
      console.error("에러 발생:", error);
      alert("로그인에 실패했습니다");
      // 에러가 나면 code는 사용하지 못하기 때문에 삭제
      window.history.replaceState({}, document.title, "/");
      return false;
    }
  }

  //상단 if문에 걸리지 않는 경우
  return false;
};
