import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const uri = process.env.Monngo_URI

const connectDB = () =>{
    return mongoose.connect(uri)
}


export default connectDB;