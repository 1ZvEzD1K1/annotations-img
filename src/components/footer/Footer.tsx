import React from "react";
import "./style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="info-tutorial">
        <div className="text">To leave a comment, mouseover</div>
        <div className="img-container">
          <img src={require("../../assets/img.png")} alt="mous" />
        </div>
      </div>
      <div className="info-tutorial">
        <div className="text">on an image and click the left mouse button</div>
        <div className="img-container">
          <img src={require("../../assets/img1.png")} alt="mous" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
