import Seo from "./components/Seo";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ results }) {
  // navigate 하는 방법 2가지
  // 1) Link
  // 2) onClick : 유저가 form 제출하고 나면 코드를 통해 자동으로 유저를 navigating

  const router = useRouter();
  const onClick = (id, title) => {
    router.push(
      // url
      {
        pathname: `/movies/${title}/${id}`,
        // url 이동이 됨
        query: { id, title },
      },
      // as 사용해서 url 숨김 (쿼리문 형식으로 말고, 내가 원하는 형식으로)
      `/movies/${title}/${id}`,

      // // url
      // {
      //   pathname: `/movies/${title}/${id}`,
      //   query: {
      //     title,
      //   },
      // },
      // // as 사용해서 url 숨김
      // `/movies/${id}`,
    );
  };
  // useEffect(
  //   () => {
  //     (async () => {
  //       setMovies(results);
  //     })();
  //   },

  // async () => {
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  //   );
  //   const json = await response.json();
  // },
  // [],
  // );
  return (
    <Container className="container">
      {/* <Head>
        <title>Home | Next Movies</title>
      </Head> */}
      <Seo title="Home" />
      {/* {!movies && <h4>Loading...</h4>} */}
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <Link href={`/movies/${movie.original_title}/${movie.id}`}>
            <h4>{movie.original_title}</h4>
          </Link>
        </div>
      ))}
    </Container>
  );
}

// 1) CSR : Loading 화면 보여준 다음에 데이터를 받음. => navbar, footer, 가운데 loading

// 2) SSR (데이터가 유효할 때, 화면이 보여지게 됨) => loading 화면 없이 API가 완료되도록 기다린 후에 모든 정보를 보여줌
// 더이상 페이지에 loading은 없고, 영화정보는 전부 reactJS가 아닌 HTML로 보여줌.
// nextJS가 자동으로 props들을 넣어주고, reactJS가 props를 받아다가 흡수(hydrate) !
//? getServerSideProps 에서 API를 fetch 해옴.
export async function getServerSideProps() {
  // 오직 백엔드에서만 실행됨.
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

// /movies/:id(변수) ===> react DOM 에서 처리하는 방식

// library : 너가 개발자로서 사용하는 것 => 우리가 원할 때 부르고 사용하고 싶을 때 사용 (react.js) --- ReactDOM.render 존재
// framework : 너의 코드를 불러오는 것 => 집 같은 것. 모든 것을 동작하게 함, 특정 rule을 따라야 함. 규칙을 따라서 코드가 있어야 하는 곳에 잘 두면 됨.
//            - 내가 코드를 적절한 곳에 넣어야 함, 수정 못함. (nextjs) --- ReactDOM.render 저어어... 깊은 곳에 존재할 것 (추상화 시켜서, 직접 접근은 못하지만...)

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  gap: 20px;

  .movie {
    cursor: pointer;
  }

  .movie img {
    max-width: 100%;
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  .movie:hover img {
    transform: scale(1.05) translateY(-10px);
  }

  .movie h4 {
    font-size: 18px;
    text-align: center;
  }
`;
