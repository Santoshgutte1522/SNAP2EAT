import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import path from "path";
import connectDB from "./config/db.js";

// Route Imports
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Utility & Model Imports
import { sendWhatsAppReminder } from "./utils/whatsappService.js";
import User from "./models/User.js";

dotenv.config();
connectDB(); // Establishes connection to AWS-hosted MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("SNAP2EAT API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/health", healthRoutes);

// Static Folder for Prescription/Proof Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// --- AUTOMATED WHATSAPP REMINDERS (CRON JOB) ---
// Checks every minute to see if a reminder is due
// Checks every minute
// --- AUTOMATED WHATSAPP REMINDERS (CRON JOB) ---
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  // Helper function to clean phone and send reminder to avoid repeating code
  const triggerReminder = (user, message) => {
    // This removes the '+' and ensure the format is 91xxxxxxxxxx
    const cleanPhone = String(user.phone).replace(/\D/g, "");
    sendWhatsAppReminder(user.name, message, cleanPhone);
  };

  // --- MORNING: Breakfast (08:30 AM) ---
  if (currentTime === "08:30") {
    const users = await User.find({ goal: { $exists: true } });
    users.forEach((user) =>
      triggerReminder(user, "Time for your Breakfast & Vitamins! 🥗"),
    );
  }

  // --- AFTERNOON: Weight Loss Lunch (13:00 PM) ---
  if (currentTime === "13:00") {
    const users = await User.find({ goal: "Weight Loss" });
    users.forEach((user) =>
      triggerReminder(user, "Lunch Time! Stick to your Low Calorie plan. 🍗"),
    );
  }

  // --- EVENING: Workout (17:30 PM) ---
  if (currentTime === "17:30") {
    const users = await User.find({
      goal: { $in: ["Weight Loss", "Muscle Gain"] },
    });
    users.forEach((user) =>
      triggerReminder(user, "Time for your Evening HIIT Session! 🏃‍♂️"),
    );
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
