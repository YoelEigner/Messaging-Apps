const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { text } = require("express");
const { get_Current_User, get_Current_User_By_Username, get_All_Users, user_Disconnect, join_User, join_Private_Room, get_room_Users, user_Private_Leave, findPrivateUser } = require("./dummyuser");

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

    socket.on("mainRoom", async ({ roomname, userId }) => {

        const p_user = join_User(socket.id, userId, roomname);
        socket.join(roomname);
        //alert for a new user joining the room
        const allUsersAndMe = await get_All_Users()
        socket.broadcast.to("mainroom").emit("alert", allUsersAndMe);
        setTimeout(() => {
            socket.emit("alert", allUsersAndMe);
        }, 1000)
    })


    socket.on("groupRoom", ({ userId, roomnames }) => {
        console.log(userId, roomnames, "eswerwrere")

        roomnames.forEach(roomname => {
            const g_user = join_Private_Room(socket.id, userId, roomname);
            socket.join(roomname);

        });


    })


    socket.on("createGroup", ({ roomname, users }) => {
        users.forEach(async (x) => {
            const user = await get_Current_User(x)
            let g_user = join_Private_Room(user.id, x, roomname);
            socket.join(roomname);

            const allUsers = await get_room_Users(roomname)

            if (g_user) {
                // console.log("user", user, "xxxxxx", x)

                io.to(g_user.id).emit("newGroup", {
                    roomname: roomname,
                    allUsers: allUsers
                });
            }

        })

    })

    socket.on("joinRoom", async ({ roomname, userId }) => {
        socket.join(roomname)


    })

    socket.on("groupMessage", async ({ text, roomname, sender }) => {
        const test = await get_room_Users(roomname)
        console.log(test, "reter")
        let message = { sender: sender, roomname: roomname, text: text, }
        socket.broadcast.to(roomname).emit("newMessage", message);
    })
   

    //user sending message
    socket.on("private", async ({ text, sender, reciver, chatId }) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(reciver);
        const s_user = get_Current_User(sender);

        console.log("P & S", s_user.userId, p_user.userId, text, chatId)

        if (p_user) {
            // socket.emit("private", {
            //     sender: s_user.userId,
            //     reciver: p_user.userId,
            //     text: text,
            //     chatId : chatId
            // });

            io.to(p_user.id).emit("private", {
                sender: s_user.userId,
                reciver: p_user.userId,
                text: text,
                chatId : chatId
            });
        }
    });

    //when the user exits the room
    socket.on("disconnect", async () => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);
        const allUsersAndMe = await get_All_Users()
        socket.broadcast.to("mainroom").emit("alertDisconnect", allUsersAndMe);

    });
});

