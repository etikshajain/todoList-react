import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'
const moment=require('moment')
const NoteItem = (props) => {

    const {deleteNote}=useContext(noteContext);

    const [state, setstate] = useState("")

    return (
        <>
            
            <div className={props.note.state==="done"?"todo-row complete":"todo-row"}>
            
            <div className="card-body">
                <h5 className="card-title" style={{display:"inline"}}>{props.note.task}</h5>
                {props.note.state==="done"?<></> : 
            moment().format().substring(0,10)>props.note.deadline ? <span className="badge bg-success mx-2" style={{marginTop:"12px"}}>Pending</span>:
           <></>}
                <p className="card-text"><strong>Deadline:</strong>{props.note.deadline.substring(0,10)} </p>
                {/* <p className="card-text">date:{props.note.date} </p> */}
                {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                <div>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>deleteNote(props.note._id)}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                    <input onClick={()=>props.complete(props.note)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem
