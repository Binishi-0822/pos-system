
import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js';
import dotenv from "dotenv";
dotenv.config();

const userRegister = async () => {
    connectToDatabase()
    try{
        const hashPassword = await bcrypt.hash("owner",10);
        const newUser = new User({
            name: "Owner",
            email: "owner@gmail.com",
            address: "A 67/1, Algoda, Dehiowita",
            telephoneNo: "0771385495",
            password: hashPassword,
            role: "owner"
        })
        await newUser.save();
    }catch(error){
        console.log(error)
    }
}

userRegister();