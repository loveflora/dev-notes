//] layout.js 특징
// * 하나 또는 그 이상의 page를 감싸는 포장지
// --> layout.js 포장지, page.js 실제내용
// * app 폴더에 root 가 되는 layout.js 하나는 반드시 존재
// * 중첩 가능

import Link from "next/link";
import "./globals.css";
// layout.js 에 global.css 를 import 함 -> 모든 페이지에 적용

// metadata 는 정해진 이름
export const metadata = {
  title: "NextJS Course App",
  description: "Generated by Sarah",
};

export default function RootLayout({ children }) {
  return (
    <html>
      {/* head 태그 존재하지 않는 대신, 상단에 metadata 존재 */}
      <body>
        {children}
        {/* page 내용이 들어감 */}
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <input type="button" value="delete" />
          </li>
        </ul>
      </body>
    </html>
  );
}
