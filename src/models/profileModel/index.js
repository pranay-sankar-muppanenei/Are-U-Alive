import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, // one profile per user
    },

    name: {
      type: String,
      required: true,
    },

    emergencyEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.profiles || mongoose.model("profiles", profileSchema);

export default Profile;
