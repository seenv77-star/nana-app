import type { NextConfig } from "next";

// 정적 사이트로 내보내기 → out/ 폴더를 Netlify, Cloudflare Pages 등에 그대로 올릴 수 있어요.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // 이미지는 미리 WebP로 최적화해 public/images 에 둡니다.
};

export default nextConfig;
