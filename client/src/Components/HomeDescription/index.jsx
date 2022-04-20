import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
function HomeDescription() {
  return (
    <section className='home-description-section'>
      <div className="home-hook">
        <p className='hook-title'>Create Your Board</p>
        <p className='hook-caption'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quisquam, earum praesentium eligendi consequuntur, maiores facilis molestiae vitae odio voluptate exercitationem doloribus suscipit esse excepturi qui libero explicabo? Debitis, repellendus.</p>
        <Link to='/register' className='hook-btn'>Get Started Now</Link>
      </div>
      <img src="https://userstyles.org/style_screenshots/148517_after.png" alt="Trello" />
  </section>
  );
}

export default HomeDescription;
