import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {email, password}
      );
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role === "owner"){
          navigate('/admin-dashboard')
        }else{
          navigate('/cashier-dashboard')
        }
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        setEmail(error.response.data.error)
      }else{
        setError("Server Error")
      }
    }
  }

  return (
    <div>
      <h2>POS System</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            type="email" 
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input 
            type="password" 
            placeholder='*******'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      
      </form>
    </div>
  )
}

export default Login