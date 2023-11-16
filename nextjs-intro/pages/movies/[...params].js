// /movies/1/....

import { useRouter } from "next/router";
import Seo from "../components/Seo";

// 컴포넌트 내부에서 router 사용하면, router는 프론트에서만 실행됨. (client side에서만 실행됨)
export default function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];
  // server에서는 아직 배열이 아님 -> || []  붙여줘야 함.

  console.log(router);
  // query - [id] - "url"
  // query : 파일명에 쓰인 변수명과 동일

  return (
    <div>
      <Seo title={title} />
      <h4>{title || "Loading..."}</h4>
      {/* router.query.title : 유저가 홈페이지 => 상세페이지로 넘어올 때만 존재 */}
    </div>
  );
}

// SEO 최적화 원한다면 serverSide 활용할 것 -> 페이지소스에서 빈태그에 안담기고, 영화제목 id 정보가 태그에 다 들어감.
// URL 정보 가져오기 위해서 getServerSideProps 사용 (API 에서 데이터를 fetch 해오지 않음)
// 페이지에 params를 넘겨줌.
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
