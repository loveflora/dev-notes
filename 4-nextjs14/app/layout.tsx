import "../styles/global.css";
import Navigation from "../components/navigation";

//] metadata
// 중첩됨 (merged)
// page, layout만 메타데이터를 내보낼 수 있음
// 컴포넌트에서는 metadata 내보낼 수 없고, metadata는 server 컴포넌트에서만 있을 수 있음 (client 컴포넌트는 안됨)

// 개체로 내보냄
export const metadata = {
  title: { template: "%s | (T) Next Movies", default: "Next Movies" },
  // title: "Home | Next Movies", ---> Home, about us 의 page.tsx
  // title: "About us",
  description: "The best movies on the best framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children} &copy; RootLayout
      </body>
    </html>
  );
}

// 하위 폴더에 layout.tsx를 생성하여 중첩된 레이아웃을 구성할 수 있음 (상쇄하는게 아니라, 중첩되는거 !)
// <Layout>
//   <AboutUsLayout>
//     <SalesLayout>
//        <Sales/>
//     </SalesLayout>
//    </AboutUsLayout>
// </Layout>
