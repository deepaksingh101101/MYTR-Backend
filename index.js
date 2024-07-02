import express from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import { connectToMongo } from './database/database.js';
import userRouter from './routes/userRoutes.js';
import consentRouter from './routes/consentRoutes.js';
import templateRouter from './routes/templateRoutes.js';
import analyticsRouter from './routes/analyticsRoutes.js'; 
import issueRouter from './routes/issueRouter.js';

dotenv.config()

const app=express();

app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

connectToMongo();

app.get('/',(req,res)=>{
    res.send("Testing Vercel")
    })

// app.use(fileUpload({
//     useTempFiles : false
// }));



app.use("/api/user",userRouter)
app.use("/api/consent",consentRouter)
app.use("/api/template",templateRouter)
app.use("/api/analytics", analyticsRouter);
app.use("/api/issues", issueRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})







