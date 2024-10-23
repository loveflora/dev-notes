//_ Structure
// app 폴더 내부에서는 routing 관련 파일만 넣는 것 추천

import Image from "next/image";
import Header from "../../components/header";

export default function Home() {
  //* server component - terminal
  // console.log("??");
  return (
    <main>
      <Header />
      <h2>Welcome</h2>
      <p>Hello, Web !</p>
    </main>
  );
}
