import React from 'react';
import '../styles/about.css';

function About() {
  return (
    <div id="aboutContainer">
      <h1 className="title">About us</h1>
      <hr className="customWhite" />
      <div className="motto">
        <span className="yellowText">CHOOSE</span> YOUR PIECES.
        <span className="yellowText"> BUILD</span> YOUR BATTLESTATION.
        <span className="yellowText"> LIVE</span> THE DREAM.
      </div>
      <div id="textContainer">
        <div id="historyParagraph">
          <div className="secondTitle">History</div>
          <hr className="customWhite" align="left" />
          <div className="whiteText">
            dui id ornare arcu. Nullam eget felis eget nunc lobortis mattis
            aliquam faucibus purus. Adipiscing elit pellentesque habitant morbi
            tristique senectus. Ligula ullamcorper malesuada proin libero.
            Viverra nam libero justo laoreet sit amet. In cursus turpis massa
            tincidunt dui ut ornare lectus sit. Pellentesque habitant morbi
            tristique senectus. Nisl suscipit adipiscing bibendum est ultricies
            integer quis auctor. Aliquet enim tortor at auctor urna nunc id
            cursus. Non arcu risus quis varius quam quisque id. Justo nec
            ultrices dui sapien eget mi. Lorem sed risus ultricies tristique
            nulla aliquet enim tortor at.dui id ornare arcu. Nullam eget felis
            eget nunc lobortis mattis aliquam faucibus purus. Adipiscing elit
            pellentesque habitant morbi tristique senectus. Ligula ullamcorper
            malesuada proin libero. Viverra nam libero justo laoreet sit amet.
            In cursus turpis massa tincidunt dui ut ornare lectus sit.
            Pellentesque habitant morbi tristique senectus. Nisl suscipit
            adipiscing bibendum est ultricies integer quis auctor. Aliquet enim
            tortor at auctor urna nunc id cursus. Non arcu risus quis varius
            quam quisque id. Justo nec ultrices dui sapien eget mi. Lorem sed
            risus ultricies tristique nulla aliquet enim tortor at.
          </div>
        </div>
        <div id="foundersParagraph">
          <div className="secondTitle">Founders</div>
          <hr className="customWhite" align="left" />
          <div className="whiteText">
            <ul>
              <li>
                Antoine <span className="yellowText">Ho</span>
              </li>
              <li>
                Charles <span className="yellowText">Nguyen</span>
              </li>
              <li>
                Côme <span className="yellowText">Sica</span>
              </li>
              <li>
                Kevin <span className="yellowText">Li</span>
              </li>
              <li>
                Kha <span className="yellowText">Pham</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
