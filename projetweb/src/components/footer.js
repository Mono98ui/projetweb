import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <div id="footer" className="footerTextWhite">
      <div id="footer-motto">
        <div id="PPTLogo">
          <img
            className="logoPicture"
            src="https://pcpartpicker.com/static/img/pl-icon.svg"
            alt="logo-pcpiecetrackr"
          />
        </div>
        <div className="footerMottoWhite">
          <div>
            <span className="footerMottoYellow">CHOOSE</span> YOUR PIECES
          </div>
          <div>
            <span className="footerMottoYellow">BUILD</span> YOUR BATTLESTATION
          </div>
          <div>
            <span className="footerMottoYellow">LIVE</span> THE DREAM
          </div>
          <div>
            <span className="footerCopyright">
              &copy; 2020 PCPieceTrackr. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
