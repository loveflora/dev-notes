//_ info만 렌더링하는 컴포넌트
// 자신에 관한 데이터만 fetching

import { API_URL } from "../app/(home)/page";

async function getMovie(id: string) {
  console.log(`Fetching movies : ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return <h6>{JSON.stringify(movie)}</h6>;
}
