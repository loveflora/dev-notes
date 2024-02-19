import express from "express";
import http from "http";
// socket.io 는 WebSocket 의 일부가 아님
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

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
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

function publicRooms() {
  // wsServer.sockets.adapter 로부터 sids, rooms를 가져옴
  //-- sids : 개인방
  //-- rooms : 개인방,공개방 다 있음
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  // const sids = wsServer.sockets.adapter.sids;
  // const rooms = wsServer.sockets.adapter.rooms;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms; // 서버 안에 있는 모든 방
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

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

    //-- 1) 메세지를 하나의 socket에만 전송
    // "welcome" 이벤트를 roomName에 있는 모든 사람에게 emit (보내는 사람 제외)
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));

    //-- 2) 메세지를 모든 socket에 전송
    wsServer.sockets.emit("room_change", publicRooms());

    // setTimeout(() => {
    // BE가 실행을 시켜서(함수 호출), FE에서 해당 함수가 실행됨
    // - BE애서 실행되는 것은 아님. 보안에 문제가 생길 수 있기 때문.
    //   done("hello from the backend");
    // }, 1000);
  });

  //-- 1) disconnecting : socket이 방을 떠나기 바로 직전 (아직 방을 떠난게 아님)
  //  => 브라우져는 이미 닫았지만 아직 연결이 끊어지지 않은 그 찰나에 발생하는 이벤트 (그래서 room 정보가 살아있음)
  socket.on("disconnecting", () => {
    socket.rooms.forEach(
      (room) =>
        socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1),
      // 방을 아직 떠난게 아니라서, 떠날 우리 방도 포함되어서 계산됨.
      // 그래서 -1
    );
  });

  //-- 2) disconnect : 연결이 완전히 끊어졌을때 발생하는 이벤트 (room 정보가 비어있음)
  // 새로고침하면 room 지움
  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
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
