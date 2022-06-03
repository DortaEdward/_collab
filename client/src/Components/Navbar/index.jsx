import React from "react";
import { useStoreState } from 'easy-peasy';
import "./styles.scss";
import { Link } from "react-router-dom";
function Navbar({user}) {
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
      <nav>
        <ul className='nav-links'>
          <li className='nav-link'>
            <p>Welcome, {user.displayName}</p>
          </li>
          <li className='nav-link'>
            <img className='user_img' src={user.imageUrl}  alt="User Profile" />
          </li>
          <li onClick={() => logout()} className='nav-link logout-btn'>Log Out</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
