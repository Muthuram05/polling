import React, { useState } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';
import { signIn, signUp } from '../../controllers/auth';
import { userStore } from '../../store';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = userStore((state)=>state.setUser)
  const handleSubmit = (e) => {
    signIn(email,password).then((data) => setUser(data))
  };
  
  return (
   <div>
    <h1>Sign In</h1>
     <div className='form_inputs'>
        <label className='form_label'>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='form_input'
        />
     </div>
     <div className='form_inputs'>
     <label className='form_label'>
        Password:
      </label>
      <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='form_input'
        />
     </div>
     <Link to={"/sign-up"}>Create Account</Link>
      <button type="submit" onClick={handleSubmit}>Login</button>
   </div>
  );
};

export default LoginForm;