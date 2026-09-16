import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import {} from "./model/bookModel.js"
import router, {} from "./routes/booksRoute.js"
import cors from "cors"

const app = express();
dotenv.config({path:"./config/config.env"});

app.use(express.json());

app.use(cors({
    origin:'http:/localhost:5173',
    methods:['GET','PUT','DELETE','POST'],
    allowedHeaders:['Content-Type']
}))
// routes
app.use("/books",router)


app.listen(process.env.PORT , ()=>{
    console.log(`server running on ${process.env.PORT}`);
})

mongoose.connect(process.env.mongo_URI)
.then(()=>{
console.log("mongodb connect successfully");
})
.catch((err)=>{
    console.log("mongo connection err" ,err);
})