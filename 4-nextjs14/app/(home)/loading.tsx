export default function Loading() {
  return <h2>Loading...</h2>;
}

//_ 파일명 꼭 loading 이어야 하고 !
//_ page 파일 옆에 있어야 해요 !
// 즉각적인 로딩상태 확인가능

// BE가 content를 streaming (프레임워크가 페이지를 작은 html로 나누고, 준비된 부분들을 하나씩 보여줌)

// movies가 fetch될 때까지 기다리고,
// movies가 fetch되면 통신 끝내고,
// NextJS가 새 컴포넌트 보내고,
// 이것을 프레임워크가 FE에서 교체

// 통신 마무리되었을 때, 프레임워크에 의해 실제 결과값으로 자동 교체
