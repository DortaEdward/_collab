import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import "./styles.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const { getUserData } = useStoreActions(actions => actions.user);
  const { user } = useStoreState(state => state.user);
  useEffect(() => {
    if(localStorage.getItem('token') && !user){
      getUserData();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header>
      <Link to='/' className="logo link">
        <div className="logo-circle"></div>
        <p className="logo-text">_Collab</p>
      </Link>
      {
        user ? 
        <nav>
        <ul className='nav-links'>
          <li className='nav-link'>
            <p>Welcome, {user.displayName}</p>
          </li>
          <li className='nav-link'>
            <img className='user_img' src='user.png'  alt="User Profile" />
          </li>
          <li onClick={() => logout()} className='nav-link logout-btn'>Log Out</li>
        </ul>
      </nav>
      : <></>
      }
    </header>
  );
}

export default Navbar;
