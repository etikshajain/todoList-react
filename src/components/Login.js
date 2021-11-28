import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
const host="http://localhost:5000";
const Login = () => {

    let history=useHistory();

    const [creds, setCreds] = useState({email:"",password:""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:creds.email,password:creds.password}) 
          });
          const json= await response.json(); 
        //   console.log(json)
        if(json.success===true){
            //save the auth token and redirect
            localStorage.setItem('token',json.token);
            //redirecting to home:
            history.push("/");

        }
        else{
            alert("invalid credentials")
        }
    }

    const handleOnChange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value});
    }

    return (
        <div className="container">
        <h1 className="my-5">Login to access your todoList!</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={handleOnChange} name="email" value={creds.email} aria-describedby="emailHelp" minLength={5} required/>
     
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

export default Login
