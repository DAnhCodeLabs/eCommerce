import express from "express";
import cros from "cors";
import "dotenv/config";
import connectDB from "./config/mongdb.js";
import authRouter from "./routes/authsRoutes.js";
import adminRouter from "./routes/adminsRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import sellerRouter from "./routes/sellersRoutes.js";
const app = express();
const port = process.env.PORT || 5000;
connectDB()
app.use(express.json());
app.use(cros());

app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter);

app.get("/", (req, res) => {
  res.send("API Đang chạy...");
});

app.listen(port, () => console.log("Server đang chạy dưới port: " + port));
