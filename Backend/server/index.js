import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { 
  cors: { origin: "https://socket-io-client.onrender.com" } });

io.on("connection", (socket) => {
  console.log("New connection");
  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes();
  socket.on("message", (body) => {
    console.log(body);
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
      time,
    });
  });
});

server.listen(PORT);
console.log("Server on port", PORT);
