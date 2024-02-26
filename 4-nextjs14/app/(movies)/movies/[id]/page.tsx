// import { API_URL } from "../../../(home)/page";

import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

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

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  // console.log("==============");
  // console.log("start fetching");

  // //-- Before (직렬)
  // // const movie = await getMovie(id);
  // // const videos = await getVideos(id);

  // //-- After (parallel requests, 병렬 요청) ---> 병렬적으로 fetching
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
    <div>
      {/* Suspense 컴포넌트에는 fallback이라는 prop이 있음 => 컴포넌트가 await 되는 동안, 표시할 메세지(다른 컴포넌트)를 render 할 수 있게 해줌 */}
      <Suspense fallback={<h1>Loading movie info</h1>}>
        {/* async */}
        {/* @ts-expect-error Async Server Component */}
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        {/* @ts-expect-error Async Server Component */}
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

// 폴더명 [ ] dynamic router

//) console.log(props); 라고 하면 ?
// http://localhost:3000/movies/1?region=kr&page=2
// { params: { id: '1' }, searchParams: { region: 'kr', page: '2' } }
