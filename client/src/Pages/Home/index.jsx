import React from "react";
import "./styles.scss";

import Hero from "../../Components/Hero";
import HomeDescription from "../../Components/HomeDescription";
import HomeClosing from "../../Components/HomeClosing";
function Home() {
  return (
    <div className="home-container">
      <Hero />
      <HomeDescription />
      <HomeClosing />
    </div>
  );
}

export default Home;
