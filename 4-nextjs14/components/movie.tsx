"use client";
// server에는 onClick 이라는 이벤트가 없으므로, 위를 추가

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/movie.module.css";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}

export default function Movie({ title, id, poster_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div className={styles.movie}>
      <img src={poster_path} alt={title} onClick={onClick} />
      {/* prefetch : 사용자가 클릭하기 전부터 미리 fetch */}
      {/* => Home에서 scroll 내리면, 해당 링크 클릭하기 전부터, 요청 보냄 */}
      <Link prefetch href={`/movies/${id}`}>
        {title}
      </Link>
    </div>
  );
}
