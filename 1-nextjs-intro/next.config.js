/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

const API_KEY = process.env.API_KEY;

module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/old-blog/:path*", // 어디론가 이동하면
  //       destination: "/new-blog/:path*", // user를 여기로 보낸다
  //       permanent: false, // 브라우저나 검색엔진이 기억
  //     },
  //   ];
  // },
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

// 변경했을 경우 다시 시작해야 함
