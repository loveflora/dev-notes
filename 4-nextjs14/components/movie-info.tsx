//_ info만 렌더링하는 컴포넌트
// 자신에 관한 데이터만 fetching

import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-info.module.css";

async function getMovie(id: string) {
  console.log(`Fetching movies : ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  // return <h6>{JSON.stringify(movie)}</h6>;
  return (
    <div className={styles.container}>
      <img src={movie.poster_path} className={styles.poster} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3 className={styles.vote_average}>
          ⭐️ {movie.vote_average.toFixed(1)}
        </h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          Homepage &rarr;
          {/* right arrow */}
        </a>
      </div>
    </div>
  );

  return;
}
