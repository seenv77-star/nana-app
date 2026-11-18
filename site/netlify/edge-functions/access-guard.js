/**
 * KY연애코칭 — 접속 제한 (Netlify Edge Function)
 *
 * 하는 일
 *  1) 허용한 나라(기본: 한국) 밖에서 들어오면 '접근 제한' 화면을 보여 줘요.
 *  2) AI 학습·수집 봇과 자동 수집 도구(curl, python 등)는 나라와 상관없이 막아요.
 *  3) 검색엔진(구글·네이버·다음·빙)과 링크 미리보기(카카오톡·페이스북 등)는 통과시켜요.
 *     ※ 봇 이름(User-Agent)은 흉내 낼 수 있어서, 이 규칙만으로 모든 우회를 막을 수는 없어요.
 *
 * 설정은 아래 CONFIG만 바꾸면 돼요.
 */
const CONFIG = {
  enabled: true,
  allowCountries: ["KR"],          // 예: 해외 교민도 받으려면 ["KR", "US", "JP", "CA", "AU"]
  blockAiBots: true,
  allowSearchEngines: true,
  kakaoChannel: "",                // 예: "https://pf.kakao.com/_xxxxxx/chat" (접근 제한 화면의 문의 버튼)
};

const SEARCH_AND_PREVIEW =
  /(Googlebot|Google-InspectionTool|Storebot-Google|AdsBot-Google|Yeti|Daumoa|Daum|bingbot|kakaotalk-scrap|facebookexternalhit|Facebot|Twitterbot|Slackbot|TelegramBot|Discordbot|LinkedInBot|WhatsApp)/i;

const AI_AND_SCRAPERS =
  /(GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|CCBot|Bytespider|PerplexityBot|Perplexity-User|Amazonbot|meta-externalagent|meta-externalfetcher|FacebookBot|Diffbot|Omgili|ImagesiftBot|cohere|YouBot|Timpibot|AhrefsBot|SemrushBot|MJ12bot|DotBot|DataForSeoBot|PetalBot|python-requests|python-urllib|aiohttp|httpx|Scrapy|curl\/|Wget|Go-http-client|node-fetch|axios|okhttp|libwww|HeadlessChrome|PhantomJS|Puppeteer|Playwright|Selenium)/i;

export default async (request, context) => {
  if (!CONFIG.enabled) return context.next();

  const url = new URL(request.url);
  // 배포 폴더에 함께 올라가는 설정 파일은 보여 주지 않아요
  if (url.pathname.startsWith("/netlify/") || url.pathname === "/netlify.toml") {
    return new Response("Not Found", { status: 404 });
  }

  const ua = request.headers.get("user-agent") || "";
  if (!ua.trim()) return blocked(403, false);

  if (CONFIG.allowSearchEngines && SEARCH_AND_PREVIEW.test(ua)) return context.next();
  if (CONFIG.blockAiBots && AI_AND_SCRAPERS.test(ua)) return blocked(403, false);

  const country = context.geo?.country?.code;
  // 나라를 알 수 없는 경우(로컬 테스트 등)는 막지 않아요
  if (!country || CONFIG.allowCountries.includes(country)) return context.next();

  return blocked(403, true);
};

function blocked(status, overseas) {
  const kakao = CONFIG.kakaoChannel
    ? `<a class="b" href="${CONFIG.kakaoChannel}" rel="noopener">카카오톡으로 문의하기</a>`
    : "";
  const extra = overseas
    ? `<p>해외에서 접속 중이시라면 카카오톡 채널로 문의해 주세요.</p>${kakao}`
    : "";
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>접근이 제한되었어요 | KY연애코칭</title>
<style>
html,body{margin:0;height:100%;background:#24151F;color:#F6EFEE;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Noto Sans KR",sans-serif}
main{min-height:100%;display:grid;place-items:center;text-align:center;padding:40px 24px;box-sizing:border-box}
.m{font-family:Georgia,"Times New Roman",serif;font-weight:300;font-size:64px;letter-spacing:-.04em;color:#D9BC86;margin:0}
.k{font-size:11px;letter-spacing:.4em;color:#CDBCC5;margin:6px 0 40px}
h1{font-weight:400;font-size:22px;margin:0 0 14px}
p{color:#CDBCC5;font-size:15px;line-height:1.8;margin:0 0 6px}
.b{display:inline-block;margin-top:24px;padding:14px 26px;border-radius:999px;background:#FEE500;color:#191919;text-decoration:none;font-size:15px;font-weight:600}
</style></head><body><main><div>
<p class="m">KY</p><p class="k">KING YOURSELF</p>
<h1>접근이 제한되었어요</h1>
<p>이 페이지는 허용된 환경에서만 볼 수 있어요.</p>${extra}
</div></main></body></html>`;
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
  });
}

export const config = { path: "/*", excludedPath: ["/robots.txt"] };
