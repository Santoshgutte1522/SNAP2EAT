import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: Number,
    weight: Number, // in kg
    height: Number, // in cm
    bmi: Number,
    goal: { type: String, enum: ["Weight Loss", "Muscle Gain", "Maintenance"] },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
