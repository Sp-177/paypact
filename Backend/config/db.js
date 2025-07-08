import mongoose from "mongoose"

export default connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MOGO_URL)
    }
    catch(error){
        console.log("connection failed")
        process.exit(1)
    }
}