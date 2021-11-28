import React,{useContext, useEffect,useRef,useState} from 'react'
// import PropTypes from 'prop-types'
import noteContext from '../context/notes/noteContext'
import NoteItem from "./NoteItem"
import AddNote from "./AddNote"

import { useHistory } from "react-router-dom";
const moment=require('moment')
export const Notes = () => {
    const {notes,getAllNotes,editNote}=useContext(noteContext);
    const [note,setNote]=useState({id:"",etask:"",edeadline:"",edate:""});
    let history=useHistory();
    useEffect(() => {
        // console.log(localStorage.getItem('token'));
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else{
            history.push("/login");
        }
    }, [])

    const ref=useRef("");
    const refClose=useRef("");
    const updateNote = (curr_note)=>{
        ref.current.click();
        refClose.current.click();
        setNote({id:curr_note._id,etask:curr_note.task,edeadline:curr_note.deadline,edate:moment().format().substring(0,10)});
    }
    const handleOnChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleClick = (e)=>{
        editNote(note.id,note.etask,note.edeadline,"not done");
        refClose.current.click();
    }

    const complete = (curr_note)=>{
        if(curr_note.state==="not done"){
            editNote(curr_note._id,curr_note.task,curr_note.deadline,"done");
        }
        else{
            editNote(curr_note._id,curr_note.task,curr_note.deadline,"not done");
        }
    }

    return (
        <>
        <AddNote/>

        {/* modal: */}
         {/* Button trigger modal  */}
         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit task</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="my-3">
                    <div className="mb-3">
                        <label className="form-label "><h3>Task</h3></label>
                        <textarea className="form-control" id="etask" value={note.etask} name="etask" onChange={handleOnChange} minLength={1} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><h3>Deadline</h3></label>
                        <input className="form-control" type="date" value={note.edeadline} id="edeadline" name="edeadline" onChange={handleOnChange}  required />
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etask.length<1 ? true:false} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

        <div className="row my-3">
            <h1>Tasks:</h1>
            <div className="container mx-2">
            {notes.length===0 && "No notes to display"}
            </div>
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note} updateNote={updateNote} complete={complete}/>
            })}

            </div>
        </>
    )
}


