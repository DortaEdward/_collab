import React, { useRef, useState } from 'react'
import LoadingIcon from '../Loading';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

function LoginForm({activeForm, setActiveForm}) {
  const { login } = useStoreActions(actions => actions.user);
  const {user, loading, error} = useStoreState(state => state.user);
  const navigator = useNavigate();

  const loginCall = async (e) => {
    e.preventDefault();
    const payload = {
      username:username.current.value,
      password:password.current.value
    };
    await login(payload);
    if(localStorage.token){
      navigator('/dashboard');
    }
  }

  const username = useRef(null);
  const password = useRef(null);

  return (
    <form onSubmit={loginCall} className='form-container'>
      <h2>Sign Up With Your Username</h2>
      <p>Dont Have An Account?<span onClick={() => setActiveForm(!activeForm)}>Register</span></p>
      {
        error
        ?
          <p className="form-error">There is An error</p>
        :
          <></>
      }
      <input type="text" className="username-input" placeholder='Username' ref={username} />
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