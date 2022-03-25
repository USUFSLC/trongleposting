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
  console.log("New client connected");
  socket.emit("initial-posts", (await Post.findAll({
    limit: 150,
    order: [
      ['id', 'DESC']
    ]
  })));
  socket.on("new-post", async (message) => {
    await Post.create(message).then((x) => {
      io.sockets.emit("post-added", x.dataValues);
    }).catch((y) => socket.emit("error", y));
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8000';
server.listen(port, host, () => console.log(`Listening on http://${host}:${port}/`));
