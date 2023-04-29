const express = require("express");
const { connection } = require("./db");
require("dotenv").config()

const { userRouter } = require("./routes/User.router");
const jwt = require("jsonwebtoken");
const { auth } = require("./middleware/auth_middleware");
const { noteRouter } = require("./routes/Note.routes");
const cors=require("cors");
const app = express();
app.use(cors())
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});
app.use(auth);
app.use("/notes", noteRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
  console.log(`server listening on port ${process.env.PORT}`);
});
