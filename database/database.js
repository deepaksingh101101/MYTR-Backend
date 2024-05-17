import mongoose from 'mongoose'

export const connectToMongo=async()=>{
try {
//    const conn= await mongoose.connect("mongodb+srv://deepaksingh101101:wUQmP2MAnhmcDEY1@cluster0.moyw7tw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   const conn= await mongoose.connect("mongodb://127.0.0.1:27017/DB")
   console.log("Database Connected")
} catch (error) {
    console.log(error)
}
}
