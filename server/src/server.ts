const express = require("express");
const { Server, Socket } = require("socket.io");
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

// Define message structure
interface MessageData {
  room: string;
  message: string;
}

io.on("connection", (socket: any) => {
  socket.on("oneToOneMessage", (data: MessageData) => {
    if (data?.room && data?.message) {
      console.log(`Message received in room ${data.room}:`, data.message);
      socket.to(data.room).emit("reciveMessage", data.message);
    }
  });

  socket.on("join_room", (room: string) => {
    if (room) {
      socket.join(room);
    }
  });

  socket.on("disconnect", () => {});
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
