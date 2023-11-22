// io는 자동적으로 Back-End socket.io와 연결해주는 function
const socket = io();

// Socket.io 는 연결된 모든 socket을 자동으로 추적함
// sockets.push(socket); 을 적을 필요 없음

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  // send가 아니라 emit

  socket.emit(
    "enter_room", // 1) event 이름
    input.value, // 2) ~ 아무거나
    showRoom, // 3) 마지막 : 함수
    // 함수도 전송 가능
  );
  roomName = input.value;
  // FE 에서 object 전송
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = "Someone Joined !";
  ul.appendChild(li);
});
