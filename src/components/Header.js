import React from 'react'
import ndclogo from "../images/ndc-logo.png";
import uenrlogo from "../images/uenr-logo.png";

function Header() {
  return (
    <header>
      <img src={ndclogo} className="logo ndc-logo" alt="ndc-logo" />
      <h1 className="main-heading">TEIN-UENR REGISTRATION PORTAL</h1>
      <img src={uenrlogo} className="logo uenr-logo" alt="uenr-logo" />
      <hr />
    </header>
  );
}

export default Header