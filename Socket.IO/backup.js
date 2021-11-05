const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { text } = require("express");
const { get_Current_User, get_Current_User_By_Username, get_All_Users, user_Disconnect, join_User } = require("./dummyuser");

app.use(express());
const port = 8000;

app.use(cors());

var server = app.listen(
    port,
    console.log(
        `Server is running on the port no: ${(port)} `
    )
);
const options = {
    cors: true
}
const io = socket(server, options);

//initializing the socket io connection 
io.on("connection", (socket) => {



    socket.broadcast.emit('test', "data") // sends to all except the sender

    socket.on("mainRoom", async ({ username, roomname }) => {

        socket.emit('test', "data")  // sends to the sender

        const p_user = join_User(socket.id, username, roomname);
        await socket.join(roomname);

        //alert for a new user joining the room
        const allUsersAndMe = await get_All_Users()
        socket.broadcast.to("mainroom").emit("alertUsers", allUsersAndMe);
        socket.emit("alertUsers", allUsersAndMe);



        // socket.broadcast.to(p_user.roomname).emit("alertUsers", {
        //     userId: p_user.id,
        //     username: p_user.username,
        //     text: `${p_user.username} has joined the chat`,
        // });

        // socket.emit("alertUsers", {
        //     userId: p_user.id,
        //     username: p_user.username,
        //     text: `Welcome ${p_user.username}`,
        // });
    })

    //user sending message
    socket.on("privateChat", ({ text, username, to }) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);
        const sendTo = get_Current_User_By_Username(to);

        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });

        io.to(sendTo.id).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });








    // socket.on("joinRoom", ({ username, roomname }) => {
    //     //* create user
    //     console.log(socket.id, roomname, "=id");
    //     const p_user = join_User(socket.id, username, roomname);
    //     socket.join(p_user.roomname);

    //     //display a welcome message to the user who have joined a room
    //     socket.emit("message", {
    //         userId: p_user.id,
    //         username: p_user.username,
    //         text: `Welcome ${p_user.username}`,
    //     });

    //     //displays a joined room message to all other room users except that particular user
    //     socket.broadcast.to(p_user.roomname).emit("message", {
    //         userId: p_user.id,
    //         username: p_user.username,
    //         text: `${p_user.username} has joined the chat`,
    //     });
    // });

    // //user sending message
    // socket.on("chat", ({ text }) => {
    //     //gets the room user and the message sent
    //     const p_user = get_Current_User(socket.id);
    //     socket.emit("message", {
    //         userId: p_user.id,
    //         username: p_user.username,
    //         text: text,
    //     });
    //     socket.broadcast.to(p_user.roomname).emit("message", {
    //         userId: p_user.id,
    //         username: p_user.username,
    //         text: text,
    //     });
    // });


    //when the user exits the room
    socket.on("disconnect", async () => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);

        const allUsersAndMe = await get_All_Users()
        socket.broadcast.to("mainroom").emit("alertUsers", allUsersAndMe);
        // socket.emit("alertUsers", allUsersAndMe);

        // if (p_user) {
        //     socket.broadcast.to(p_user.roomname).emit("left", {
        //         userId: p_user.id,
        //         username: p_user.username,
        //         text: `${p_user.username} has left the chat`,
        //     });
        // }
    });
});