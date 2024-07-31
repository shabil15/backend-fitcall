import dotenv from "dotenv";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRouter from "../routes/userRoute";
import adminRouter from "../routes/adminRoute";
import trainerRouter from "../routes/trainerRoute";
import chatRouter from '../routes/chatRoute';
import ratingRouter from '../routes/ratingRoutes';
import errorHandler from "../../useCase/handler/errorHandler";
import checkSubscription from "../services/checkSubscription";
import SocketManager from "../services/Socket";

dotenv.config();
export const app = express();

app.use(
  cors({
    origin: ["https://fitcall-beta.vercel.app","http://localhost:4000"],
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(morgan("dev"));

const httpServer = http.createServer(app);
new SocketManager(httpServer);

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/trainer", trainerRouter);
app.use('/api/chat', chatRouter);
app.use('/api/rating', ratingRouter);

app.use(errorHandler);
checkSubscription();

export { httpServer };
