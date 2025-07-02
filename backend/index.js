import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { dbConnect } from "./helpers/database/dbConenct.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
