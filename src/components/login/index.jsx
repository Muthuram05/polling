import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import { userStore } from "../../store/index.js";
import "./styles.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = userStore((state)=>state.setUser)
  
  function handleSubmit(){
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      setUser(user)
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  return (
   <div className={"loginContainer"}>
    <h1>Sign In</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>Login</button>
   </div>
  );
};

export default LoginForm;