import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filePath: { type: String, required: true },
    type: { type: String, enum: ["Prescription", "Proof"], required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Prescription", prescriptionSchema);
