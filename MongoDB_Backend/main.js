const express = require("express");
const cors = require('cors')

let app = express();
app.use(cors())

const UserRouter = require('./routes/userRouter')
const groupRouter = require('./routes/groupeRouter')

app.use(express());
require('./mongoDB/Connection')
const port = 7000;

app.use(cors());

app.use(express.json());
app.use("/api/chats", UserRouter);
app.use("/api/group", groupRouter);

app.listen(
    port,
    console.log(
        `Server is running on the port no: ${(port)} `
    )
);

