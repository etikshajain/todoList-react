import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
const host="http://localhost:5000";

const Signup = () => {
    let history=useHistory();
    const [creds, setCreds] = useState({name:"",email:"",password:""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:creds.name,email:creds.email,password:creds.password}) 
          });
          const json= await response.json(); 
        //    console.log(json)
        if(json.success===true){
            // localStorage.setItem('token',json.token);
            //redirecting to login:
            history.push("/login");

        }
        else{
            alert("This email id is already registered")
        }
    }

    const handleOnChange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value});
    }

    return (
        <div className="container">
        <h1 className="my-5">Sign Up with your email account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" onChange={handleOnChange} name="name" value={creds.name} aria-describedby="emailHelp" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={handleOnChange} name="email" value={creds.email} aria-describedby="emailHelp"/>

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleOnChange} name="password" value={creds.password} id="password" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
