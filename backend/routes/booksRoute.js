import express from "express";
import Book, {} from "../model/bookModel.js"
import mongoose from "mongoose";

const router = express.Router();

// routes
router.get("/",(req,res)=>{
    console.log(req);
    return res.status(234).send('welcome');
});

/// route for save a book


router.post("/",async (req , res)=>{
    try {
const {title, author, publishYear} = req.body;

        if(!title || !author || !publishYear){
            return res.status(400).send({
                message : "send all required fields"
            });
        }


    const book = await Book.create({title, author, publishYear})
    return res.status(200).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

//  to get all books 

router.get("/books", async (req,res) => {
    try {

        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data:books
        });

    } catch (error) {
       console.log(err.message);
       res.status(500).send({message:error.message}) 
    }
})


// to get a single book


router.get("/:id", async (req,res) => {
    try {

        const {id} = req.params;
        const books = await Book.findById(id);
        return res.status(200).json(books);

    } catch (error) {
       console.log(err.message);
       res.status(500).send({message:error.message}) 
    }
})

// to update a book

router.put("/:id", async(req,res)=>{
const {title, author, publishYear} = req.body;

    try {
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message:"fill all fields "
            })
        }
const {id} = req.params;
const result = await Book.findByIdAndUpdate(id, req.body);

if(!result){
    return res.status(404).json({
        message:"book not found"
    })
}
return res.status(200).send({
    message:"update successfully",

})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
    }
})


// for delete a bookk 

router.delete("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

    if(!result){
        return res.status(404).json({message:"book not found"});

    }
    return res.status(200).send({message:"book delete  successfully"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"deleting error"})
    }
})


export default router;