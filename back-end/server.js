const express = require("express");
const dotenv = require("dotenv");
//routes
const authRouter = require("./routers/auth");

//middlewares

//cors
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3307;
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log("Request:", req.url);
  next();
});
app.use(express.static("public"));
app.use(express.static("storage"));

app.use("", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
