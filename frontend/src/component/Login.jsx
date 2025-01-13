import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';

function Login() {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Assume you get the token from the server after successful login
    localStorage.setItem('token', token);
    dispatch(login(token));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
