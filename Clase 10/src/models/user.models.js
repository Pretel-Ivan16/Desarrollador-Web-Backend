import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    email_verified: {
      type: Boolean,
      default: true,
      require: true
    },
    created_at: {
      type: Date,
      require: true,
      default: Date.now
    }
  }
)

const User = mongoose.model('User', userSchema)
export default User