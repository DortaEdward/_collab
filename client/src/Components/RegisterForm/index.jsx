import React, { useRef, useState } from 'react'
import LoadingIcon from '../Loading';


function RegisterForm({activeForm, setActiveForm}) {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const repeatPassword = useRef(null);
  const displayName = useRef(null);
  const imageUrl = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const register = async (e) => {
    e.preventDefault();
    console.log('Registering');
    setLoading(!loading);
    setTimeout(() => {
      console.log('Changing Loading');
      setLoading(false);
    }, 3000);
  }

  return (
    <form onSubmit={register} className='form-container'>
      <h2>Sign Up With Your Email</h2>
      <p>Already Have An Account?<span onClick={() => setActiveForm(!activeForm)}>Login</span></p>
      {
        error
        ?
          <p className="form-error">There is An error</p>
        :
          <></>
      }
      <input type="email" className="email-input" placeholder='Email' ref={email} />
      <input type="text" className="username-input" placeholder='Username' ref={username} />
      <input type="password" className="password-input" placeholder='Password' ref={password} />
      <input type="password" className="repeat-password-input" placeholder='Enter Password Again' ref={repeatPassword} />
      <input type="text" className="display-name-input" placeholder='Display Name' ref={displayName} />
      <input type="text" className="image-url-input" placeholder='Image Url' ref={imageUrl} />
      {
        loading
        ?
          <LoadingIcon />
        :
          <button type='submit' className="form-btn">Register</button>
      }
    </form>
  )
}

export default RegisterForm