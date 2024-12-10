import React from 'react';
function Footer() {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="copyright">
          {process.env.REACT_APP_COPYRIGHT_TEXT}
        </div>
        <div className="credits">
          Designed by <a href="https://md-portfolio-2.netlify.app/">Manish Deotale</a>
        </div>
      </footer>
    </>
  );
}
export default Footer;