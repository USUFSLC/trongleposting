const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Post = require('./models').Post;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", async (socket) => {
  socket.emit("initial-posts", (await Post.findAll()));
  socket.on("new-post", async (message) => {
    await Post.create(message).then((x) => {
      io.sockets.emit("post-added", x.dataValues);
    }).catch((y) => socket.emit("error", y));
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8000';
server.listen(port, host, () => console.log(`Listening on http://${host}:${port}/`));