import React, { useRef, useState } from 'react'
import LoadingIcon from '../Loading';
import { useStoreActions, useStoreState } from 'easy-peasy';
import './styles.scss';

function RegisterForm({activeForm, setActiveForm}) {
  const username = useRef(null);
  const password = useRef(null);
  const repeatPassword = useRef(null);
  const displayName = useRef(null);
  const imageUrl = useRef(null);

  const { loading, error } = useStoreState(state => state.user);
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
    <div className='user-access-container'>
        <div className="logo">
          <div className="logo-circle"></div>
          <p className="logo-text">_Collab</p>
        </div>
        <form onSubmit={registerCall} className='form-container'>
          <h2>Sign up for an account</h2>
          {
            error
            ?
              <p className="form-error">{error}</p>
            :
              <></>
          }
          <input type="text" className="username-input" placeholder='Username' ref={username} required />
          <input type="password" className="password-input" placeholder='Password' ref={password} required />
          <input type="password" className="repeat-password-input" placeholder='Re-Password' ref={repeatPassword} required />
          <input type="text" className="display-name-input" placeholder='Display Name' ref={displayName} required />
          <input type="text" className="image-url-input" placeholder='User Image' ref={imageUrl} />
          {
            loading
            ?
              <LoadingIcon />
            :
              <button type='submit' className="form-btn">Sign Up</button>
          }
          <p>Already Have An Account?<span onClick={() => setActiveForm(!activeForm)}>Login</span></p>
        </form>
    </div>
  )
}

export default RegisterForm