const msgList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const msgForm = document.querySelector('#msg');

// socket: 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMsg = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg); // {"type":"nickname","payload":"닉네임"}
  //\ object 타입을 string 으로 바꾸는 이유
  // javascript 서버가 아닐 수도 있기 때문 (javascript object로 보내면 해석 못함)
};

socket.addEventListener('open', () => {
  console.log('Connected to Server');
});

socket.addEventListener('message', (message) => {
  console.log('Just got this :', message.data, ' from server');

  const li = document.createElement('li');
  li.innerText = message.data;
  msgList.append(li);
});

// server가 오프라인이면, browser한테 알려줌
socket.addEventListener('close', () => {
  console.log('Disconnected from Server');
});

// setTimeout(() => {
//   socket.send('hello from the browser');
// }, 2000);

const handleMsgSubmit = (e) => {
  e.preventDefault();
  const input = msgForm.querySelector('input');
  socket.send(makeMsg('msg', input.value)); // front-end의 form에서 back-end로 전송
  input.value = '';
};

const handleNickSubmit = (e) => {
  e.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMsg('nickname', input.value));
  input.value = '';
};

msgForm.addEventListener('submit', handleMsgSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
