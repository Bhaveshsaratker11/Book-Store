import mongoose from "mongoose";
import { timeStamp } from "node:console";


const bookSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publishYear:{
        type:String,
        require:true
    },
},
 {
        timeStamp : true
    }
);

const Book = mongoose.model("Book",bookSchema);

export   default Book;