import React, { useRef, useState } from 'react'
import LoadingIcon from '../Loading';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {useNavigate} from 'react-router-dom';

function RegisterForm({activeForm, setActiveForm}) {
  const username = useRef(null);
  const password = useRef(null);
  const repeatPassword = useRef(null);
  const displayName = useRef(null);
  const imageUrl = useRef(null);

  const { user, loading, error } = useStoreState(state => state.user);
  const { register, setError } = useStoreActions(actions => actions.user);


  const registerCall = async (e) => {
    e.preventDefault();
    try {
      if (password.current.value === repeatPassword.current.value){
        const payload = {
          username: username.current.value,
          password: password.current.value,
          displayName: displayName.current.value,
          imageUrl: imageUrl.current.value ? imageUrl.current.value : 'user.png'
        }
        await register(payload);
        setActiveForm(!activeForm);
      } else{
        setError('Passwords Do Not Match');
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <form onSubmit={registerCall} className='form-container'>
      <h2>Sign Up With Your Email</h2>
      <p>Already Have An Account?<span onClick={() => setActiveForm(!activeForm)}>Login</span></p>
      {
        error
        ?
          <p className="form-error">{error}</p>
        :
          <></>
      }
      <input type="text" className="username-input" placeholder='Username' ref={username} required />
      <input type="password" className="password-input" placeholder='Password' ref={password} required />
      <input type="password" className="repeat-password-input" placeholder='Enter Password Again' ref={repeatPassword} required />
      <input type="text" className="display-name-input" placeholder='Display Name' ref={displayName} required />
      <input type="text" className="image-url-input" placeholder='Image Url | Not Required' ref={imageUrl} />
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