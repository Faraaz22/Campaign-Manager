import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../css/Login.css' 

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password })
      navigate('/')
    } catch (err) {
      console.error('Signup error:', err)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Sign Up</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button onClick={signup}>Sign Up</button>
        <p className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
