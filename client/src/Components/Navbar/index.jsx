import React from "react";
import { useStoreState } from 'easy-peasy';
import "./styles.scss";
import { Link } from "react-router-dom";
function Navbar() {
  const { user } = useStoreState(state=>state.user);
  return (
    <header>
      <div className="logo">
        <span>_C</span>ollab
      </div>
      <nav>
        <ul className='nav-links'>
          {
            user
              ?
                <>
                  
                  <li className='nav-link'>
                    {user.displayName}
                  </li>
                  <li className='nav-link'>
                    <img className='user_img' src={user.imageUrl}  alt="User Profile" />
                  </li>
                  <li className='nav-link'>
                    
                  </li>
                </>
              : <>
                  <li className='nav-link'>
                    <Link to='/access'>Try It For Free</Link>
                  </li>
                </>
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
