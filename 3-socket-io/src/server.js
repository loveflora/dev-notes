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
  console.log(socket);
});

httpServer.listen(3000, handleListen);
