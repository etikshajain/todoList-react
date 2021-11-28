import noteContext from "./noteContext"
import React,{useState} from "react"
const moment=require('moment')
const NoteState=(props)=>{

    const host="http://localhost:5000";
    const initialNotes=[];

    const [notes, setNotes] = useState(initialNotes);

    //getALL NOTES:
    const getAllNotes=async()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const json= await response.json(); 
        //   console.log(json);

        //adding in front end
        setNotes(json);
    }


    //add a note:
    const addNote=async(task, deadline)=>{
        //api call
        let data={
            "task":task,
            "deadline":deadline,
            "date":moment().format().substring(0,10)
        }
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(data) 
          });
          const json= await response.json(); 

        //adding in front end
        setNotes(notes.concat(json));
    }


    //delete a note:
    const deleteNote=async (id)=>{
        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
        //   const json= await response.json(); 
        //deleting in frontend:
        let newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        console.log("deleted note with id"+id);
    }


    //edit a note
    const editNote=async (id,task, deadline,state)=>{
        //api call
        let data={
            "task":task,
            "deadline":deadline,
            "date":moment().format().substring(0,10),
            "state":state
        }
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(data) 
          });
          const json= await response.json(); 
        //editing in frontend
        for (let index = 0; index < notes.length; index++) {
            if(notes[index]._id===id){
                notes[index].task=task;
                notes[index].deadline=deadline;
                notes[index].date=moment().format().substring(0,10);
                notes[index].state=state;
                break;
            }
        }
        setNotes(notes);
        getAllNotes();
    }
    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;