import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    unique: true,
    select: false//don't return the password when querying for user data
  },
  role: {
      type: String,
      required: true,
      default: 'user',
      enum: ["user", "admin", "root"]
  }
}, {
    timestamps: true
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);