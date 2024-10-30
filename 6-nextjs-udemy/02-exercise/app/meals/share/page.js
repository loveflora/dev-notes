"use client";

import { useActionState } from "react-dom";
import ImagePicker from "../../../components/meals/image-picker";
import MealsFormSubmit from "../../../components/meals/meals-form-submit";
import { shareMeal } from "../../../lib/actions";
import classes from "./page.module.css";

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, { message: null });
  //< [state, formAction]
  // state : 상태 - (미)응답값
  // formAction : form 태그의 action 속성값
  //< useActionState(1, 2)
  // 1 : form 이 제출할 때 동작하는 실제 Server Action
  // 2 : 컴포넌트의 초기 state(상태), shareMeal action이 동작하기 전이나 response가 돌아오기 전에 useFormState가 반환할 초기값

  //>> action.js 파일로 Server Action 따로 분리
  // 그렇게 안하면 상단에 'use client' 입력 시, 에러남.
  // 같은 파일에 client, server 두 종류 모두 있으면 -> 서버측 코드가 클라이언트에 위치해서 보안문제가 생길 수 있음
  // 그렇기 때문에 server action을 다른 파일에서 import해서 client component에서 사용
  //>>
  // async function shareMeal(formData) {
  //   "use server";
  //   // 'server action' 생성해주어, 오직 서버에서만 실행되게 보장해줌 (서버 측에서 제어)
  //   // 앞에 'async' 붙여야 함
  //   // react에도 존재하는 기능
  //   // 'use server' 사용했는데, 상단에 'use client' 사용하면 에러남

  //   const meal = {
  //     title: formData.get("title"),
  //     //  <input type="text" id="title" name="title" required /> 받아옴
  //     summary: formData.get("summary"),
  //     instructions: formData.get("instructions"),
  //     image: formData.get("image"),
  //     creator: formData.get("creator"),
  //     creator_email: formData.get("email"),
  //   };

  //   console.log(meal);
  // }
  //>>

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          {/* action={shareMeal} */}
          {/* -> Server Action 설정 */}
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          <p className={classes.actions}>
            {/* <button type="submit">Share Meal</button> */}
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
