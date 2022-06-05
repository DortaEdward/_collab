import React, { useState, useRef } from 'react'
import './styles.scss';

import LoginForm from '../../Components/LoginForm';
import RegisterForm from '../../Components/RegisterForm'

function Access() {
  const [activeForm, setActiveForm] = useState(true);
  return (
    <div className='access-page-container'>
      {
        activeForm
          ?
            <LoginForm activeForm={activeForm} setActiveForm={setActiveForm}/>
          :
            <RegisterForm activeForm={activeForm} setActiveForm={setActiveForm}/>
      }
    </div>
  )
}

export default Access;