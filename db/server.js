import mongoose from 'mongoose'

const uri = "mongodb+srv://Himanshu_Bisht:4ecCOaZ6fyVNsxNY@himanshuapi.hoxoq28.mongodb.net/HimanshuAPI?retryWrites=true&w=majority&appName=HimanshuAPI"

const connectDB = () =>{
    return mongoose.connect(uri)
}


export default connectDB;