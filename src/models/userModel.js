import mongoose from "mongoose";

// create a new schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verfiyToken: String,
  verfiyTokenExpiry: Date,
});

// create a user model instance
const User = mongoose.models.users || mongoose.model("users", userSchema);


//export it to be used in the application
export default User;
