import sql from "better-sqlite3";

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
