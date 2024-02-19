import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import livereloadMiddleware from 'connect-livereload';
import livereload from 'livereload';

const app = express();

const liveServer = livereload.createServer({
  exts: ['js', 'pug', 'css'],
  delay: 1000,
});

liveServer.watch(__dirname);

app.use(livereloadMiddleware());

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));

app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => {
  console.log(`Listen on http://localhost:3000`);
};

// http 서버와 webSocket 서버 둘다 사용 가능
// http protocol과 ws 연결을 지원
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//-- db
const sockets = [];

// socket: 연결된 브라우저
// function handleConnection(socket) {
//   console.log(socket);
// }

// wss.on("connection", handleConnection);

// wss : 전체 서버
// socket : 특정 socket
// 서버에 있는 메서드가 아닌, socket에 있는 메서드는 socket으로 직접적인 연결을 제공해줌
wss.on('connection', (socket) => {
  sockets.push(socket);

  // nickname 미정일 경우
  socket['nickname'] = 'Anonymous';

  console.log('Connected to Browser');

  // browser 연결이 끊기면, server에 event 발생시킴
  socket.on('close', () => {
    console.log('Disconnected from Browser');
  });

  socket.on('message', (message) => {
    // socket.send(message.toString('utf8'));  // 이것만 작성하면 다른 브라우저에서 확인 불가

    // message
    // {"type":"nickname","payload":"닉네임"}
    const parsed = JSON.parse(message); // 다시 object로 변환

    //-- switch
    switch (parsed.type) {
      case 'msg':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsed.payload}`)
        );
        break;
      case 'nickname':
        socket['nickname'] = parsed.payload; // "nickname": 닉네임 (key-value 추가)
        break;
    }

    //-- if ~ else
    // if (parsed.type === 'msg') {
    //   // 다른 브라우저에서도 확인 가능
    //   sockets.forEach((aSocket) => aSocket.send(parsed.payload));
    // } else if (parsed.type === 'nickname') {
    //   console.log(parsed.payload);
    // }
  });

  // connection이 생기면, socket으로 즉시 메세지를 보냄 (BE -> FE)
  socket.send('hello!!!');
});

server.listen(3000, handleListen);

///////////////////////////////

// 프로토콜 : http, WebSocket

//=== http ===
//-- stateless
// 서버는 response를 보낸 후, 유저가 누군인지 잊어버림.
// 서버는 오직 request를 받을 때만 답장(response)을 함

//=== WebSocket ===
//-- 양방향
// 처음에만 request를 기다려야 함.
// 이후 request를 기다릴 필요 없음.
// handshake
