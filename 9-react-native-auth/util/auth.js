import axios from "axios";

const API_KEY = "AIzaSyD3OZW3DOAZv2FzdWTsLYk5bvwytIbkW-U";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

//_ 비동기 함수 (async, await) - promise 반환
// promise가 성공(resolve)할 때까지, 대기(await)
// -> 로딩 오버레이 표시
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
