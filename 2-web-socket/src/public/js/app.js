// socket: 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("Just got this :", message.data, " from server");
});

// server가 오프라인이면, browser한테 알려줌
socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  socket.send("hello from the browser");
}, 2000);
