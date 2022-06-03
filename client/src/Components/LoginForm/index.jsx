import React, { useRef, useState } from 'react'
import LoadingIcon from '../Loading';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

function LoginForm({activeForm, setActiveForm}) {
  const { login } = useStoreActions(actions => actions.user);
  const {loading, error} = useStoreState(state => state.user);
  const navigator = useNavigate();

  const loginCall = async (e) => {
    e.preventDefault();
    const payload = {
      username:username.current.value,
      password:password.current.value
    };
    await login(payload);
    if(localStorage.getItem('token')){
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  const username = useRef(null);
  const password = useRef(null);

  return (
    <div className='login-container'>
      <div className="login-container-left">
        <div className="form-logo">
            <div className="form-logo-circle"></div>
            <p className="form-logo-text">_Collab</p>
          </div>
        <form onSubmit={loginCall} className='form-container'>
          <h2>Log into _Collab</h2>
          {
            error
            ?
              <p className="form-error">{error}</p>
            :
              <></>
          }
          <input type="text" className="username-input" placeholder='Username' ref={username} required />
          <input type="password" className="password-input" placeholder='Password' ref={password} required />
          {
            loading
            ?
              <LoadingIcon />
            :
              <button type='submit' className="form-btn">Log in</button>
          }
          <p>Don't Have An Account?<span onClick={() => setActiveForm(!activeForm)}>Sign Up</span></p>
        </form>
      </div>
      <div className="login-container-right">
        <img src="Register-Hero.png" alt="Register" />
        <p className="hero-text">Productivity created easily</p>
      </div>
  </div>
  )
}

export default LoginForm;