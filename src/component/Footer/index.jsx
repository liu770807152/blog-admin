import React, { useState } from "react";
import footerData from '../../utils/footerData'
import "./styles.scss";

const Footer = () => {
  const [active, setActive] = useState(null);

  return (
    <footer className="footer">
      <div className="flex justify-around">
        <div className="footer-box">
          <div className="left-logo">
            <a href='/'>
              <img className="logo" src="/logo_transparent.png" alt='logo'></img>
            </a>
          </div>
          <div className="right-memu">
            <div>
              <span>Author: Chris</span>
            </div>
            <div>
              <span>Copyright © 2022</span>
            </div>
          </div>
        </div>
        <div className="tools-box">
          <div className="inner">
            <div className="tool-list">
              {footerData.map((item) => (
                <div
                  className="tool-item tool-notion1"
                  onMouseEnter={() => setActive(item.id)}
                  onMouseLeave={() => setActive(null)}
                  key={item.id}
                  style={{
                    backgroundColor: `${
                      active === item.id ? item.bgColor : ""
                    }`,
                  }}
                >
                  <i
                    className="tool-icon"
                    style={{
                      backgroundImage: `url(${item.icon})`}}
                  />
                  <div className="tool-desc">
                    <div className="hide-desc" />
                    <div
                      className="inner"
                      style={item.bgColor === "#fff" ? { color: "#333" } : null}
                    >
                      <p className="name">{item.name}</p>
                      <p className="describe">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
