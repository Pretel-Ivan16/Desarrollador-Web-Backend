import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now
    }
})
const User = mongoose.model('User', userSchema)
export default User
