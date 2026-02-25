import Prescription from "../models/Prescription.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    // req.user comes from the protect middleware
    const newFile = await Prescription.create({
      user: req.user._id,
      // CHANGE: Use .replace(/\\/g, '/') to swap Windows backslashes with web forward slashes
      filePath: req.file.path.replace(/\\/g, "/"),
      type: req.body.type || "Prescription",
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Upload Controller Error", error: error.message });
  }
};
