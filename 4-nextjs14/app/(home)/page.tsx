// root segment ( Home / )

// route group
// (괄호) 표시는 url에 영향 주지 않음.

////////////////////////

//] 1. server component에서 fetch를 사용할 경우
//-- 1) useState, useEffect 사용 안해도 되고,
//-- 2) metadata 사용 O, use client 사용 X

//-- 3) 로딩상태도 없는 것처럼 보임
// why ?
// NextJS는 프레임워크라, server component 사용하면 자동으로 fetch된 url을 캐싱시켜줌
// 응답이 캐싱되어서 실제 로딩되는건 없음
// server component 에서 NextJS가 fetch한 것을 기억하기 때문

//-- 4) 네트워크 탭에도 movies 관련 API 없음
// why ? fetch 하는건 BE라서

export const metadata = {
  title: "Home ",
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

// getMovies가 await 사용했으므로 'async' 꼭 써줘야해요 !
export default async function Page() {
  const movies = await getMovies();
  return <div> {JSON.stringify(movies)} </div>;
}

//] 2. server component에서 fetch를 사용하지 않을 경우

//-- 1) use client 필요 O
//_ "use client";
// fetch는 항상 client에서 일어남
// 브라우저가 API에 요청을 보냄

// React <---> API <---> DB

//-- 2) useState, useEffect 필요 O
//_ import { useEffect, useState } from "react";

//-- 3) metadata 필요 X
//) You are attempting to export "metadata" from a component marked with "use client", which is disallowed.
// export const metadata = {
//   title: "Home ",
// };

//_ export default function Page() {
//-- 4) 로딩 걸림
//   const [isLoading, setIsLoading] = useState(true);
//   const [movies, setMovies] = useState([]);

//-- 5) 네트워크 탭에서 API 주소 확인 가능
//   const getMovies = async () => {
//     const response = await fetch(
//       "https://nomad-movies.nomadcoders.workers.dev/movies",
//     );

//     const json = await response.json();

//     setMovies(json);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getMovies();
//   }, []);

//   return <div>{isLoading ? "Loading..." : JSON.stringify(movies)}</div>;
// }
