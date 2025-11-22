import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. React에서 보낸 Access Token 꺼내기
    const { accessToken } = await req.json()

    if (!accessToken) throw new Error('토큰이 없습니다.')

    // 2. 디스코드 API에 GET 요청 (내 정보 대신 물어봐주기)
    // 유저가 속한 서버 목록 가져오기
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Bearer 뒤에 띄어쓰기 필수!
      },
    })

    const userInfo = await response.json()

    if (!response.ok) throw userInfo

    // (나중에 여기에 '돌쇠가 있는 서버만 남기는 필터링 로직'을 추가할 예정!)

    // 3. 결과 반환
    return new Response(JSON.stringify(userInfo), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})