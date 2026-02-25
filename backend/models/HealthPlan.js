import mongoose from "mongoose";

const healthPlanSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goal: { type: String, required: true },
    dietDetails: { type: String, required: true },
    exerciseDetails: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("HealthPlan", healthPlanSchema);
