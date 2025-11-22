// supabase/functions/discord-oauth/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// 1. CORS 설정 (브라우저에서 요청을 허락받기 위해 필수!)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Preflight 요청(옵션 요청) 처리 - 이거 없으면 CORS 에러 남
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. 클라이언트(React)에서 보낸 code 받기
    const { code } = await req.json()
    
    // 3. 환경변수에서 비밀키 꺼내기 (곧 설정할 거예요)
    const clientId = Deno.env.get('DISCORD_CLIENT_ID') ?? ''
    const clientSecret = Deno.env.get('DISCORD_CLIENT_SECRET') ?? ''
    const redirectUri = Deno.env.get('DISCORD_REDIRECT_URI') ?? ''

    // 4. 디스코드로 토큰 교환 요청 (POST)
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', redirectUri)
    params.append('client_id', clientId)
    params.append('client_secret', clientSecret)

    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })

    const data = await response.json()

    // 5. 에러 처리 및 결과 반환
    if (!response.ok) throw data

    // 성공! React에게 토큰 돌려주기
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error("에러 발생!", error)

    const errorBody = error instanceof Error ? { error: error.message } : error

    return new Response(JSON.stringify(errorBody), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})