import React, { useState } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
   <div>
    <h1>Sign In</h1>
     <form onSubmit={handleSubmit} className='formContainer'>
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
      <button type="submit">Login</button>
    </form>
   </div>
  );
};

export default LoginForm;