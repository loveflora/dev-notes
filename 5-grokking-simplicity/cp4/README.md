# CP 4. 액션에서 계산 빼내기

## 1. 테스트와 재사용성

### 1) 테스트

- DOM 업데이트와 비즈니스 규칙은 분리되어야 함
- 전역변수가 없어야 함

### 2) 재사용성

- 전역변수에 의존하지 않아야 함
- DOM을 사용할 수 있는 곳에서 실행된다고 가정하면 안됨
- 함수가 결과값을 리턴해야 함

## 2. 액션, 계산, 데이터 구분하기

### 액션

- 전역변수를 바꾸는 것
- DOM에서 읽는 것 or 바꾸는 것

### 입력

- 인자 : `명시적 입력`
- 전역변수를 읽는 것 : `암묵적 입력`

### 출력

- 리턴값 : `명시적 출력`
- 전역변수를 바꾸는 것 : `암묵적 출력`
- 콘솔에 찍는 것 : `암묵적 출력`

### 암묵적 코드를 없앤 코드

> 원래 코드

```javascript
function calc_cart_total() {
  shopping_cart_total = 0;
  // 계산에 해당되는 코드 시작
  for (let i = 0; i < shopping_cart.length; i++) {
    let item = shopping_cart[i];
    shopping_cart_total += item.price;
  }
  // 계산에 해당되는 코드 끝
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
```

<br/>

> 암묵적 출력을 없앤 코드

```javascript
function calc_cart_total() {
  shopping_cart_total = calc_total(); // 계산한 값 전역변수에 할당
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function calc_total(cart) {
  let total = 0; // 지역변수
  for(let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price;
  }
  retrun total; // 지역변수 리턴
}
```
