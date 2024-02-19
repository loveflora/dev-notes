"use client";
// "이 컴포넌트는 client에서 interactive 해야 한다"
// "This components need to be hydrated"
// BE에서 render 되고, FE에서 hydrate, interactive 됨
// (헷갈리지 말아야할 점이, 모든 컴포넌트는 server에서 render됨
//   차이점은..! use client components도 server에서 먼저 render되고 나서, hydrate 됨
//   "use client" 사용하지 않은, server components는 server에서 먼저 render되고, hydrate는 되지 않음.
//   그래서, "use client"의 유무 차이는 hydrate되냐 안되냐의 차이임.)
// => 다운 받아야할 JS이 적어짐 -> 페이지 로딩속도 상승

// - state, eventListener ...

//-- Server Side Rendering
// 모든 컴포넌트와 페이지들은 BE에서 render 됨
// 이후 html로 변환되고(상호작용은 아직 안됨), 브라우저로 넘겨짐

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const path = usePathname();
  const [count, setCount] = useState(0);

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
        </li>
        <li>
          <Link href="/about-us">About us</Link> {path === "/" ? "" : "🔥"}
        </li>
      </ul>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </nav>
  );
}

// <button>0</button> => React나 프레임워크가 client에 로드되면
// => React를 초기화하여 onClick을 부착 (hydrate함) => fully functional interactive app으로 변환

// Before >> React나 프레임워크가 client에 로드되기 전까지는 !
// 브라우저 JS 작동 안하는거라, 새로고침도 되고, button 클릭해도 작동안됨.

// After >> React나 프레임워크가 client에 로드된 이후에는 !
// 라우터 이동해도 새로고침 안되고, button 클릭하면 작동됨.

//++ 하이드레이션(Hydration)이란?
// 단순 HTML을 React 어플리케이션으로 초기화하는 작업
// 서버사이드 렌더링(SSR)을 통해 만들어 진 인터랙티브 하지 않는 HTML을 클라이언트 측 자바스크립트를 사용하여 인터랙티브한 리액트 컴포넌트로 변환하는 과정을 말한다.
// (서버 환경에서 이미 렌더링된 HTML에 React를 붙이는 것)

// 모든 컴포넌트들이 server side 에서 먼저 render 됨
// client 에서 hydrate 되는 컴포넌트는 오직 use client를 맨위에 가지고 있는 컴포넌트 뿐임.
