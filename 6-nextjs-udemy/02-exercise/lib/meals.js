import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// DB connection
const db = sql("meals.db");

// getMeals() : DB 에서 data 가져옴
//_ async
export async function getMeals() {
  // 지연 발생
  await new Promise((resolve) => setTimeout(resolve, 5000));
  //_ 1)
  // prepare: 새로운 SQL 문
  //_ 2)
  // .run() : inserting or changing data
  // .all() : fetching all data
  // .get() : fetching single row data
  //_ 3)
  // return 반환
  return db.prepare("SELECT * FROM meals").all();
}

//++ Detail
export function getMeal(slug) {
  // .get() : 하나만 가져옴
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);

  // return db.prepare("SELECT * FROM meals WHERE slug = " + slug);
  // + slug : 불안정함. SQL Injection 에 노출될 위험이 있음
}

export function saveMeal(meal) {
  //_ 1) meal 의 slug 속성에 추가
  // 설정 객체 --> '{ lower: true }' --> 모든 문자를 소문자로
  meal.slug = slugify(meal.title, { lower: true });

  //_ 2) 해로운 컨텐츠 제거 위함 (instructions 검열)
  meal.instructions = xss(meal.instructions);
  //>> [mealSlug] 내부
  //   <p
  //   className={classes.instructions}
  //   dangerouslySetInnerHTML={{
  //     __html: meal.instructions, // XSS (크로스 사이트 스크립팅 공격)에 취약 -> 'xss' 패키지 설치 (npm i xss)
  //   }}
  // ></p>
}
