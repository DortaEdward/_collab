import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
function HomeClosing() {
  return (
    <section className='home-closing-section'>
      <p className="closing-subtitle">TRY IT NOW</p>
      <h1 className="closing-heading">It's Always Free</h1>
      <p className="closing-caption">Sign Up for Free and be one of the multiple people who have fallen in love with _Collab</p>
      <Link to='/access' className='closing-btn'>Try It Now</Link>
      <p className="closing-already-user">Already using _Collab? <Link to='/access' className='closing-login-redirect'>Log In</Link></p>
  </section>
  );
}

export default HomeClosing;
