const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const moment=require('moment');

//express validator
const { body, validationResult } = require('express-validator');

//importing notes model:
const Notes = require('../models/Notes');

//ROUTE1: fetch all notes of the logged in user: GET: /api/notes/fetchallnotes -login reqq
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({userID:req.user.id});  //fetching all notes whose id is rreq.user.id
        res.json(notes);
    } catch (error) {
        res.status(500).send("Some error occured.");
    }
});


//ROUTE2: adding a new note: POST: /api/notes/addnote  --login reqq
router.post('/addnote',fetchuser,[body('task','Enter a valid task!').isLength({ min: 1 })],
    async (req,res)=>{

    //if there are errorrs return errors array object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

    //creating new note object:
    note=await Notes.create({
        userID:req.user.id,
        task: req.body.task,
        date: moment().format().substring(0,10),
        deadline: req.body.deadline
      });
      res.json(note);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured.");
    }
});

//ROUTE3: updating note: PUT: /api/notes/updatenote:id  --login reqq
router.put('/updatenote/:id',fetchuser,
    async (req,res)=>{

    try{
    
    const {task,deadline,date,state}=req.body;
    //creating new note object:
    newNote={};
    if(task){newNote.task=task;}
    if(deadline){newNote.deadline=deadline;}
    newNote.date=moment().format().substring(0,10);
    if(state){newNote.state=state;}
    
    //find the note to be updated and update it:
    let note=await Notes.findById(req.params.id);

    //check if note exists or not:
    if(!note){
        return res.status(404).send("Note not found");
    }

    //checking that the userid of note is same as req.user.id:
    if(note.userID.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    //now note exists and user is corretc:
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured.");
    }
});

//ROUTE4: deleting a  note: DELETE: /api/notes/deletenote/:id  --login reqq
router.delete('/deletenote/:id',fetchuser,
    async (req,res)=>{

    try{
    
    //find the note to be deleted and delete it:
    let note=await Notes.findById(req.params.id);

    //check if note exists or not:
    if(!note){
        return res.status(404).send("Note not found");
    }

    //checking that the userid of note is same as req.user.id:
    if(note.userID.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    //now note exists and user is corretc:
    note=await Notes.findByIdAndDelete(req.params.id);
    res.send({"Success":"Note deleted successfully",note:note});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured.");
    }
});

module.exports=router;