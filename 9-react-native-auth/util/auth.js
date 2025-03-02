import axios from "axios";

const API_KEY = "AIzaSyD3OZW3DOAZv2FzdWTsLYk5bvwytIbkW-U";

//_ 비동기 함수 (async, await) - promise 반환
// promise가 성공(resolve)할 때까지, 대기(await)
// -> 로딩 오버레이 표시
export async function createUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  );

  console.log(response);
}
