import React, { useState } from "react";
import { signUp } from "../../controllers/auth";




export const SignUp = () => {
  const [name, setName] = useState()
  const [lastName, setlastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState();
  function handleSubmit(){
    signUp(name, lastName, email,password).then((data) => console.log(data)).catch((err) => console.log(err));
  }
    return <div>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" value={lastName}
            onChange={(e) => setlastName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button  className="btn btn-primary" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
    </div>
}