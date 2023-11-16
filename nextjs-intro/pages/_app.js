// _app.js 먼저 보고 나서, 다른 파일을 봄.
// 모든 페이지에 적용

import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import styled from "styled-components";

// App 함수에 Component 전달
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
