import express from "express";
import upload from "../middleware/multerMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import Prescription from "../models/Prescription.js";

const router = express.Router();

// This single line handles security, the file save, and the database entry
router.post("/", protect, upload.single("file"), uploadFile);

// @desc    Get all uploads for the logged-in user
// @route   GET /api/upload/my-files
router.get("/my-files", protect, async (req, res) => {
  try {
    const files = await Prescription.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(files);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching files", error: error.message });
  }
});

export default router;
