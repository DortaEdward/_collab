import React, { useRef, useState } from 'react'
import LoadingIcon from '../Loading';

function LoginForm({activeForm, setActiveForm}) {
  const loading = false;
  const [error, setError] = useState(false);
  const login = async (e) => {
    e.preventDefault();
    console.log('Log in')
  }

  const email = useRef(null);
  const password = useRef(null);
  return (
    <form onSubmit={login} className='form-container'>
      <h2>Sign Up With Your Email</h2>
      <p>Dont Have An Account?<span onClick={() => setActiveForm(!activeForm)}>Register</span></p>
      {
        error
        ?
          <p className="form-error">There is An error</p>
        :
          <></>
      }
      <input type="email" className="email-input" placeholder='Email' ref={email} />
      <input type="password" className="password-input" placeholder='Password' ref={password} />
      {
        loading
        ?
          <LoadingIcon />
        :
          <button type='submit' className="form-btn">Log In</button>
      }
  </form>
  )
}

export default LoginForm;