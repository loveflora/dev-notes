// http://localhost:3000/meals/~~~~~~

import Image from "next/image";
import { notFound } from "next/navigation";
import { getMeal } from "../../../lib/meals";

import classes from "./page.module.css";

// Next.js 에서의 params prop : 경로에 대해 구성된 동적인 경로 segment가 키-값으로 저장되는 값으로 객체가 포함됨
// 폴더명 [대괄호] 안 = key
// 실제로 URL에 인코딩된 값(params.mealSlug)이 key의 value
export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);
  // params.mealSlug : DB에서 meal 특정 값을 가져올 수 있게 해주는 identifiers

  if (!meal) {
    notFound();
  }
  //* notFound 함수
  // 컴포넌트가 시작되는 것을 멈추고, 제일 가까운 not-found나 오류 화면 보여줌
  // -> meals > not-found.js 실행

  // 정규식 이용해서 줄바꿈 무시된 현상 해결
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions, // XSS (크로스 사이트 스크립팅 공격)에 취약 -> 'xss' 패키지 설치 (npm i xss)
          }}
        ></p>
      </main>
    </>
  );
}
