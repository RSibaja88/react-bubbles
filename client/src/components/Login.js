import React, { useState } from "react";
import axiosWithAuth from './axiosWithAuth';
import "./Login.css";

const Login = (props) => {
  const [ creds, setCreds ] = useState({username:'', password:''});
  const [ prompt, setPrompt ] = useState("");

  const handleChanges = (e) => {
    setCreds({...creds, [e.target.name]:e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault()
      axiosWithAuth().post("/api/login", creds)
          .then(res => {
            localStorage.setItem('token', res.data.payload)
            console.log("payload from handleSubmit: Login", res.data.payload)
            setPrompt("You're logging in...")
            setTimeout(() => {
                props.history.push('/bubble-page')
            }, 3000);
          })
          .catch(error => setPrompt("Sorry! Incorrect log-in info...", error))
  }

  return (
    <div className="lBody">
      <h1>Welcome to the Bubble App!</h1>
        <div className="loginForm">
          <h1>Login to See Colors</h1>
          {prompt ? <p>{prompt}</p>: null}
        <form onSubmit={handleSubmit}>
          <input type='text'
              name='username'
              placeholder="Type Username"
              onChange={handleChanges}
              value={creds.username}/>
          <input type='text'
              name='password'
              placeholder="Type Password"
              onChange={handleChanges}
              value={creds.password}/>
          <input type="submit" />
        </form>
        </div>
    </div>
  );
};

export default Login;
