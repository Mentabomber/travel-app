import express, { json, static as expressStatic } from "express";
import { config } from "dotenv";
//routes
import authRouter from "./routers/auth.js";
import journeysRouter from "./routers/journeys.js";
import stagesRouter from "./routers/stages.js";
// const messagesRouter = require("./routers/messages");

//middlewares
import errorsHandlerMiddleware from "./middlewares/errorsHandler.js";
import routeNotFoundMiddleware from "./middlewares/routeNotFound.js";
//cors
import cors from "cors";

config();

const app = express();
const port = process.env.PORT || 3307;
app.use(cors());

app.use(json());

app.use((req, res, next) => {
  console.log("Request:", req.url);
  next();
});
app.use(expressStatic("public"));
app.use(expressStatic("storage"));

app.use("/journeys", journeysRouter);

app.use("/stages", stagesRouter);

app.use("", authRouter);

// app.use("/messages", messagesRouter);

app.use(errorsHandlerMiddleware);

app.use(routeNotFoundMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
