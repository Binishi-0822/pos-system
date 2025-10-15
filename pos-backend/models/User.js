import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    telephoneNo: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["owner","cashier"], required: true},
    status: {type: String},
    profileImage: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
})

const User = mongoose.model("User", userSchema)

export default User;