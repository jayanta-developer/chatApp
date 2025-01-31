const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("User connected:", socket.id);

  socket.on("oneToOneMessage", (message: object) => {
    console.log("Message received:", message);
    socket.broadcast.emit("reciveMessage", message);
  });

  socket.on("join_room", (roomNumber: string) => {
    socket.join(roomNumber);
  });

  // socket.on("disconnect", () => {
  //   console.log("User disconnected:", socket.id);
  // });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
