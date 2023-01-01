const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
require("dotenv").config({ path: "./config/config.env" });
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Working"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT} `.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join_chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop_typing", (room) => socket.to(room).emit("stop_typing"));

  socket.on("new_message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return;

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.to(user._id).emit("message_recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
