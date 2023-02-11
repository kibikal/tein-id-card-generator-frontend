import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer>
        <p>Coppyright &copy; Tein-Uenr {currentYear}</p>
      </footer>
    </div>
  );
}

export default Footer;
