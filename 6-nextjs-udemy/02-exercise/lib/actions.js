"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// 상단에 추가

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  // prevState 실제로 안써도 작성할 것. formData는 두번째 인자이어야 하기 때문.

  // [아래 코드 제거]
  // "use server";
  // 'server action' 생성해주어, 오직 서버에서만 실행되게 보장해줌 (서버 측에서 제어)
  // 앞에 'async' 붙여야 함
  // react에도 존재하는 기능
  // 'use server' 사용했는데, 상단에 'use client' 사용하면 에러남

  const meal = {
    title: formData.get("title"),
    //  <input type="text" id="title" name="title" required /> 받아옴
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // console.log(meal);

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error("Invalid input");
  }

  await saveMeal(meal);
  redirect("/meals");
}
