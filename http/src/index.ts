import express from "express";
import userRouter from "./Router/userRouter";

const app = express();
app.use(express.json());

app.use("/api/v1", userRouter);

