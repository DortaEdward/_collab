import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
function Navbar({user}) {
  return (
    <header>
      <div className="logo">
        <span>_C</span>ollab
      </div>
      <nav>
        <ul className='nav-links'>
          {
            user
              ? <>User</>
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
