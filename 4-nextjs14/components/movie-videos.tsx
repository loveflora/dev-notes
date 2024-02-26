//_ video만 렌더링하는 컴포넌트

import { API_URL } from "../app/(home)/page";

async function getVideos(id: string) {
  console.log(`Fetching videos : ${Date.now()}`);
  await new Promise((response) => setTimeout(response, 1000));
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

// video에 대한 것만 fetching
export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
}
