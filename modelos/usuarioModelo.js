import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    user: {
      type: String,
      require: true,
      min: 6,
      max: 15,
    },
    password: {
      type: String,
      require: true,
      min: 8,
      max: 20,
    },
    centreSign: {
      type: String,
      default: "Santa",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
