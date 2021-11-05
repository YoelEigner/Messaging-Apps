const express = require("express");
const http = require("http");
var cors = require('cors')
var app = express();
app.use(cors())
const server = http.createServer(app);
const options = {
    cors: true
}
const socketIo = require("socket.io")
const io = socketIo(server, options);
const port = process.env.PORT || 4001;
const index = require("./routes/index");
app.use(index);

let interval;
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => {}
)

