export default function Sales() {
  return <h1>Sales !</h1>;
}

// /about-us/company/sales ---> 경로에서 위 파일 보임
//_ 하지만, /about-us/company ---> 경로에서는 404
//--> 따라서 "company 폴더"는 "url의 한 부분"일 뿐, 실제 페이지는 아님
// 실제 페이지로 만들려면, 폴더 안에 page.tsx 파일을 생성해야 함
