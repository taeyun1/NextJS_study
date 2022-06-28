/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
      {
        source: "/nav",
        destination: "https://www.naver.com/",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
// ===== redirect =====
// source -> 사용자가 /contact에 접속하면?
// destination -> /form으로 redirection 시켜줌 (URL이 변경되는게 유저들에게 보임)
// permanent -> redirection이 permanent(영구적)인지 아닌지에 따라서 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정됨.

// ===== rewrites =====
// redirect랑 비슷하긴 한데 유저가 URL이 변하는걸 볼 수 없음.
// 그래서 보여주면 안되는 API_KEY라던가, 중요 정보들을 노출 시키고 싶지 않을때 사용
