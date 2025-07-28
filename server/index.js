import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

// Route imports
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import stripeWebhookRoute from "./routes/stripeWebhook.route.js"; // 👈 new file

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Webhook route FIRST with express.raw
app.use("/api/v1/purchase", stripeWebhookRoute);

// Then global body parsing
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true
}));

// Other routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/purchase", purchaseRoute);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
