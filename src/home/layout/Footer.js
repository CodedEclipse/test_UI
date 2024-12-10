import React from 'react';
function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            {process.env.REACT_APP_COPYRIGHT_TEXT}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;