const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const ngrok = require("ngrok");
const PORT = 8080 || process.env.PORT;


const localtunnel = require('localtunnel');

// (async () => {
//   const tunnel = await localtunnel({ port: 80 });

//   // the assigned public url for your tunnel
//   // i.e. https://abcdefgjhij.localtunnel.me
//   // tunnel.url;
//   console.log('url: ',tunnel.url)

//   tunnel.on('close', () => {
//     // tunnels are closed
//   });
// })();

// (async function () {
//   const url = await ngrok.connect();
//   console.log(url);
// })();

const {
  userJoin,
  getUserById,
  userLeave,
  getUsersByRoom,
} = require("./utils/users");

app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname+))

const dis = (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);

    let user = getUserById(socket.id);
    console.log(user);
    socket.broadcast
      .to(user.room)
      .emit("message", `${user.username} has left the chat`);
    userLeave(socket.id);

    io.sockets.to(user.room).emit("removeUsers", user);

  });
};

const chatMessage = (socket, room) => {
  socket.on("chatMessage", (msg, username) => {
    console.log("user: ",username,"   message: ", msg);
    socket.broadcast.to(room).emit("chatMessage", msg, username);
  });
};

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);

  socket.on("joinRoom", (username, room) => {
    socket.emit("message", "Welcome to ChatHub!");
    socket.join(room);
    userJoin(socket.id, username, room);
    let allUsers = getUsersByRoom(room);

    io.sockets.to(room).emit("outputUsers", allUsers, room);
    io.sockets.to(room).emit('outputUsers', allUsers, room);
    

    socket.broadcast
      .to(room)
      .emit("message", `${username} has joined the chat`);

    dis(socket);
    chatMessage(socket, room);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:", PORT);
});
