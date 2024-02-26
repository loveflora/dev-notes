// import { API_URL } from "../../../(home)/page";

import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

// id 라는 parameter는 page component에 제공되는 객체
// page component, generateMetadata 함수 두 곳에 전달됨
// getMovie 함수도 두번 호출됨
interface IParams {
  params: { id: string };
}

//=== Metadata
// 해당 페이지는 id 값에 따라, 제목이 달라지기 때문에 (동적)
// fetching 할 수 있게 하는 함수 사용 (제목을 가져올 수 있음)
// metadata 불러오기 위해 자동으로 호출 (dynamic)
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  // metadata에서 처음 fetch 했을 때는 fetch가 한번 실행되지만,
  // 영화 정보 얻기 위해 두번째로 fetch 할 때는 캐시된 응답을 받음

  return {
    title: movie.title,
  };
}

//_ movie-info.tsx
// async function getMovie(id: string) {
//   console.log(`Fetching movies : ${Date.now()}`);
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const response = await fetch(`${API_URL}/${id}`);
//   return response.json();
// }

//_ movie-videos.tsx
// async function getVideos(id: string) {
//   console.log(`Fetching videos : ${Date.now()}`);
//   await new Promise((response) => setTimeout(response, 1000));
//   const response = await fetch(`${API_URL}/${id}/videos`);
//   return response.json();
// }

export default async function MovieDetail({ params: { id } }: IParams) {
  // console.log("==============");
  // console.log("start fetching");

  // //-- Before (직렬)
  // // const movie = await getMovie(id);
  // // const videos = await getVideos(id);

  // //-- After (parallel requests, 병렬 요청) ---> 병렬적으로 fetching
  //) Promise.all : 2가지 요청을 한 번에 시작
  //) 단점은 가장 긴 요청만큼 시간이 걸림. (다른건 1분이라도 하나가 5분이면, 전체 5분 기다려야 함)
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  // console.log("end fetching");

  // ============== Before (2초 걸림)
  // start fetching
  // Fetching movies : 1708910857739 (다름)
  // Fetching videos : 1708910858751 (다름)
  // end fetching

  // ============== After (동시에)
  // start fetching
  // Fetching movies : 1708910990352 (동일)
  // Fetching videos : 1708910990352 (동일)
  // end fetching

  // return <h1>{movie.title}</h1>;
  return (
    //=== 병렬적으로 fetch ===
    //-- 1. async
    //-- 2. data fetching
    //-- 3. Suspense로 component 감싸기
    //   4. Suspense가 component를 await 해줌
    //   5. component가 준비되면 fallback, UI를 사용자에게 전달
    <div>
      {/* <h3>Movie Detail Page</h3> */}

      {/* === ReactJS의 component인 Suspense 사용 ! === */}
      {/* 1) Promise.all과 달리, 동시에 시작하지만, 서로를 기다리진 않음 */}

      {/* 2) fetch 해야 하는 component 만 로딩 상태를 가지게 할 수 있음 */}
      {/* Suspense 컴포넌트에는 fallback이라는 prop이 있음 => 컴포넌트가 await 되는 동안, 표시할 메세지(다른 컴포넌트)를 render 할 수 있게 해줌 */}

      {/* 데이터는 캐싱됨 -> 이미 존재 */}
      {/* Suspense의 자식요소로 만든 뒤, Suspense가 component를 await 해줌 */}
      {/* 준비될 때까지 fallback 보여줌 (로딩), 필수는 아님 */}
      <Suspense fallback={<h1>Loading movie info</h1>}>
        {/* Error 방지용으로 아래 주석 작성 */}
        <MovieInfo id={id} />
        {/* --- MovieInfo는 async, await ---*/}
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

// 폴더명 [ ] dynamic router

//) console.log(props); 라고 하면 ?
// http://localhost:3000/movies/1?region=kr&page=2
// { params: { id: '1' }, searchParams: { region: 'kr', page: '2' } }
