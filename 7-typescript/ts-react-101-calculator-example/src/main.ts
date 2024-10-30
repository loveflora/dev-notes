import "./index.css";

// 1) !
// null 이나 undefined 인 경우를 지워줌 (null 일수도 있지만 무시해라)
// 2) as HTMLInputElement
// input element 로 인식
const number1El = document.getElementById("number1")! as HTMLInputElement;
const number2El = document.getElementById("number2")! as HTMLInputElement;
const resultEl = document.getElementById("result")!;

number1El.addEventListener("input", calculate);
number2El.addEventListener("input", calculate);

function calculate() {
  const number1 = Number(number1El.value);
  const number2 = Number(number2El.value);
  const result = add(number1, number2);
  resultEl.style.setProperty("--value", String(result));
}

function add(a: number, b: number): number {
  return a + b;
}
