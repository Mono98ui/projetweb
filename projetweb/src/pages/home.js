import React from 'react';
import '../styles/home.css';
import Video from '../resources/video.mp4';

function Home() {
  return (
    <div id="homeContainer">
      <h1 className="homeTitle">
        <span className="logoTitleWhite">PC</span>
        <span className="logoTitleYellow">PIECE</span>
        <span className="logoTitleWhite">TRACKR</span>
      </h1>

      <div className="videoContainer">
        <div className="videoColorOverlay">
          <video
            autoPlay muted loop
            className="video"
          >
            <source src={Video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Home;
