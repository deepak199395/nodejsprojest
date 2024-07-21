import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    contentType:String,
    required: false
  },
  resetPasswordToken: {
    type: String, // Store the reset token
    required: false
  },
  resetPasswordExpires: {
    type: Date, // Store the expiry date of the reset token
    required: false
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema); 
