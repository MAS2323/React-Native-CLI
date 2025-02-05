import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
const app = express();
const port = 3000;
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Bases de datos conetada"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || port, () => {
  console.log(`Node js server started. ${process.env.PORT || port}!`);
});
