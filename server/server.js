var http = require("http").createServer(); // explore express for making http server

const io = require("socket.io")(http, {
    cors: { origin: "*" } // lets any url access backend
});

const users = {};

io.on("connection", (socket) => {
    socket.on("new-user", (username) => {
        users[socket.id] = username;
        socket.broadcast.emit("user-connected", username);

        console.log(`[${getCurrentTime()}] <CONNECTED> ${username} connected.`);
    });

    socket.on("disconnect", () => {
        let user = users[socket.id];
        socket.broadcast.emit("user-disconnected", user);
        delete user;

        console.log(`[${getCurrentTime()}] <DISCONNECTED> ${user} disconnected.`);
    });

    socket.on("message", (message) => {
        let user = users[socket.id];
        socket.broadcast.emit("message", {message: message, username: user});

        console.log(`[${getCurrentTime()}] <CHAT> ${user}: ${message}`);
    });
});

function getCurrentTime()
{
    return new Date(Date.now()).toLocaleString('en-GB')
}

http.listen(5256, () => console.log(`[${getCurrentTime()}] <SERVER> Listening on http://localhost:5256.`))