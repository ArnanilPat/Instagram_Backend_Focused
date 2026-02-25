import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")  

  function handlesubmit(e) {
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/login", {
      username,
      password,
    }, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.response?.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handlesubmit}>

          <input 
            onChange={(e)=> setusername(e.target.value)}
            type="text" 
            name="username"
            placeholder="Enter username"
          />

          <input
            onChange={(e)=> setpassword(e.target.value)}
            type="password" 
            name="password" 
            placeholder="Enter password"
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don't have an account? 
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Login