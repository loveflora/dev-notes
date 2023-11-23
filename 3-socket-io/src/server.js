import express from "express";
import http from "http";
// socket.io 는 WebSocket 의 일부가 아님
import SocketIO from "socket.io";

import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";

const app = express();

const liveServer = livereload.createServer({
  exts: ["js", "pug", "css"],
  delay: 1000,
});

liveServer.watch(__dirname);

app.use(livereloadMiddleware());

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => {
  console.log(`Listen on http://localhost:3000`);
};

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

// FE와 연결
wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";

  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  // 여러 개를, 어떤 형식으로든 보낼 수 있음
  // (하나를 string 형식만 보낼 수 있는게 아니라)
  socket.on("enter_room", (roomName, done) => {
    // console.log(roomName); // room (입력한 값)
    // console.log(socket.id); // B7XNKRzCwh-X6oiLAAAB
    socket.join(roomName);
    // console.log(socket.rooms); // Set(2) { 'B7XNKRzCwh-X6oiLAAAB', 'room' }
    done();

    // "welcome" 이벤트를 roomName에 있는 모든 사람에게 emit (보내는 사람 제외)
    socket.to(roomName).emit("welcome", socket.nickname);

    // setTimeout(() => {
    // BE가 실행을 시켜서(함수 호출), FE에서 해당 함수가 실행됨
    // - BE애서 실행되는 것은 아님. 보안에 문제가 생길 수 있기 때문.
    //   done("hello from the backend");
    // }, 1000);
  });

  // disconnect : 연결이 완전히 끊어졌을때 발생하는 이벤트 (room 정보가 비어있음)
  // disconnecting : 브라우져는 이미 닫았지만 아직 연결이 끊어지지 않은 그 찰나에 발생하는 이벤트 (그래서 room 정보가 살아있음)
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname),
    );
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done(); // done(); 함수는 FE에서 실행됨
  });

  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
});

httpServer.listen(3000, handleListen);
