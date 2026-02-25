import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import "../style/form.scss"

const register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  async function handlesubmit(e) {
  e.preventDefault()

  axios.post("http://localhost:3000/api/auth/register", {
    username,
    email,
    password,
  },{
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
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
        
          <input 
          onInput={(e)=>{setusername(e.target.value)}} 
          type="text" 
          name='username' 
          placeholder='Enter username'/>   

          <input
          onInput={(e)=>{setemail(e.target.value)}}
           type="text"
            name='email'
           placeholder='Enter email'/>

            <input
            onInput={(e)=>{setpassword(e.target.value)}}
             type="password" 
             name='password' 
             placeholder='Enter password'/>

            <button type="submit">Register</button>
        </form>
        
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default register