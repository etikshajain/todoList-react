import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const moment=require('moment');
const AddNote = () => {
    const {addNote}=useContext(noteContext);
    const [note, setNote] = useState({task:"",deadline:moment().format().substring(0,10),date:moment().format().substring(0,10)})

    const handleClick = (e)=>{
        e.preventDefault(); //to prevent page reload upon submitting
        addNote(note.task,note.deadline,note.date);
        setNote({task:"",deadline:"moment().format().substring(0,10)",date:moment().format().substring(0,10)});
    }
    const handleOnChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <div className="container">
            <form className="my-3 todo-form">
                <div className="mb-3">
                    <label className="form-label" style={{color:"white"}}><h3>Add Task</h3></label>
                    <textarea className="form-control" id="task" name="task" value={note.task}  onChange={handleOnChange} placeholder="Add todo" minLength={1} required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{color:"white"}}><h3>Deadline</h3></label>
                    <input type="date" className="form-control" id="deadline" name="deadline"  value={note.description} onChange={handleOnChange} required />
                </div>
        
                <button disabled={note.task.length<1 ? true:false} type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
                <br/>
                <hr style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray"}} />
            </form>
            </div>
        </div>
    )
}

export default AddNote
