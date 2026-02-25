import User from "../models/User.js";
import { sendWhatsAppReminder } from "../utils/whatsappService.js";

// @desc    Calculate BMI and Update User Profile
// @route   POST /api/health/calculate-bmi
export const calculateBMI = async (req, res) => {
  const { userId, weight, height, goal } = req.body;

  try {
    // Math logic: weight (kg) / [height (m)]^2
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { weight, height, bmi, goal },
      { new: true },
    );

    res.status(200).json({
      success: true,
      bmi,
      message: `Your BMI is ${bmi}`,
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "BMI Calculation failed", error: error.message });
  }
};

// @desc    Generate a basic Diet Plan
// @route   GET /api/health/get-plan/:goal
export const generatePlan = async (req, res) => {
  const { goal } = req.params;

  // Static plans for 'vibe coding' speed
  const plans = {
    "Weight Loss": {
      diet: "High protein, low carb. Oats for breakfast, Grilled chicken/Paneer for lunch.",
      exercise: "30 mins Cardio + 20 mins HIIT",
    },
    "Muscle Gain": {
      diet: "Surplus calories. Eggs/Sprouts breakfast, Rice and Protein lunch.",
      exercise: "Heavy Weight Training - 5 days a week",
    },
  };

  const selectedPlan = plans[goal] || {
    diet: "Balanced meal",
    exercise: "Daily walking",
  };
  res.status(200).json(selectedPlan);
};

// @desc    Test WhatsApp manually from Dashboard
// @route   POST /api/health/test-whatsapp
export const testWhatsApp = async (req, res) => {
  try {
    const { name, phone } = req.user; // Get user details from protect middleware

    if (!phone) {
      return res
        .status(400)
        .json({ message: "No phone number found for this user." });
    }

    // Clean formatting: Remove any spaces or dashes
    let cleanPhone = String(phone).replace(/\D/g, "");

    // Ensure Indian country code is present (91)
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    await sendWhatsAppReminder(
      name,
      "This is a manual test from your SNAP2EAT Dashboard! 🚀",
      cleanPhone,
    );

    res.status(200).json({ success: true, message: "Test message sent!" });
  } catch (error) {
    console.error("Manual Trigger Error:", error);
    res.status(500).json({ message: "WhatsApp service not ready." });
  }
};
