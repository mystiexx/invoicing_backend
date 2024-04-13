const express = require("express");
const app = express();
const apiRouter = require("./routes/invoice.js");
const userRouter = require("./routes/user.js");
const mongoose = require("mongoose");
const cors = require("cors");

const uri = "mongodb+srv://aloneroland:r9S64ba01jZwVKBx@invoice.lfnxmt4.mongodb.net/?retryWrites=true&w=majority&appName=invoice";

app.use(express.json());
app.use(cors());

app.use(apiRouter);
app.use(userRouter);

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to database!!");
        app.listen(3000, () => {
            console.log("Server is running at port 3000");
        });
    })
    .catch((error) => {
        console.log(error.message);
        console.log("Connection failed!!");
    });
