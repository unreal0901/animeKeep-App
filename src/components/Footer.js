import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="used">
        <a href="#containerkeep">
          <i class="fa-solid fa-circle-nodes"></i>
        </a>
        <p>Used Kitsune API</p>
      </div>
      <div className="contributed">
        <p style={{ color: "var(--pinkish)" }}>
          <span>Developer:</span>
        </p>
        <p>Aditya singh rawat</p>
        <p style={{ color: "var(--pinkish)" }}>
          <span>Designer</span>
        </p>
        <p>notiamfizzy</p>
      </div>
      <div className="socials">
        <a href="https://github.com/unreal0901">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://codepen.io/unreal0901">
          <i className="fa-brands fa-codepen"></i>
        </a>
        <a href="https://www.linkedin.com/in/aditya-rawat-294a1b123/">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
