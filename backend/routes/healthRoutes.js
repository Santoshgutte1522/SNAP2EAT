import express from "express";
import {
  calculateBMI,
  generatePlan,
  testWhatsApp,
} from "../controllers/healthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for BMI calculation (POST request)
router.post("/calculate-bmi", calculateBMI);

// Route for generating plan based on goal (GET request)
router.get("/get-plan/:goal", generatePlan);

router.post("/test-whatsapp", protect, testWhatsApp);

export default router;
