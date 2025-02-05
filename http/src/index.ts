import express from "express";
import userRouter from "./Router/userRouter";
import contentRouter from "./Router/contentRouter";
import { config } from "dotenv";
import cors from "cors";

config();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://brainly.pimpalkar.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1", userRouter);
app.use("/api/v1", contentRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT || "", () => {
  console.log(`Server running at ${PORT}`);
});
