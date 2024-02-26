//_ video만 렌더링하는 컴포넌트

import { API_URL } from "../app/constants";
import styles from "../styles/movie-videos.module.css";

async function getVideos(id: string) {
  console.log(`Fetching videos : ${Date.now()}`);
  await new Promise((response) => setTimeout(response, 1000));
  // * ERROR 페이지 확인하고 싶을 경우, 아래 주석 풀기 *
  // throw new Error("Something went wrong...");

  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

// video에 대한 것만 fetching
export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ))}
    </div>
  );
}
