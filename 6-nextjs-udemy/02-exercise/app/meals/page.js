import Link from "next/link";
import { Suspense } from "react";
//; Suspense
// React에서 제공되는 컴포넌트
// 일부 데이터가 불러올 때까지 로딩 상태를 처리하고, 대체 컨텐츠를 표시할 수 있음

import classes from "./page.module.css";
import MealsGrid from "../../components/meals/meals-grid";
import { getMeals } from "../../lib/meals";

//; async
// serever component에서는 async, await 사용가능 (React에선 안됨)
// useEffect나 fetch 사용하지 않고, await로 데이터 가져옴
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
// 분리

export default function MealsPage() {
  //* [ BEFORE ]
  // export default async function MealsPage() {
  // const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
        {/* [ BEFORE ]  */}
        {/* <MealsGrid meals={meals} />  */}
      </main>
    </>
  );
}
