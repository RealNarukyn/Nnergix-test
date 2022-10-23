import express from "express";
import * as bodyParser from "body-parser";
import mainRouter from "./router/main.router";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", mainRouter);

export default app;
