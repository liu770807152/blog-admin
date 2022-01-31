import React, { useState } from 'react';
import footerData from '../../utils/footerData';
import './styles.scss';

const Footer = () => {
  const [active, setActive] = useState(null);

  return (
    <footer className="footer">
      <div className="footer__logo-container">
        <div className="footer__logo-container--left">
          <a href="/">
            <img className="logo" src="/logo_transparent.png" alt="logo"></img>
          </a>
        </div>
        <div className="footer__logo-container--right">
          <div>
            <span>Chris Liu</span>
          </div>
          <div>
            <span>Copyright © 2022</span>
          </div>
        </div>
      </div>
      <div className="footer__icon-container">
        <div className="footer__icon-container--inner">
          <div className="footer__icon-container--list">
            {footerData.map((item) => (
              <div
                className="footer__icon-container--item"
                onMouseEnter={() => setActive(item.id)}
                onMouseLeave={() => setActive(null)}
                key={item.id}
                style={{
                  backgroundColor: `${active === item.id ? item.bgColor : ''}`,
                }}
              >
                <i
                  className="footer__icon-container--icon"
                  style={{
                    backgroundImage: `url(${item.icon})`,
                  }}
                />
                <div className="footer__icon-container--item-desc">
                  <div className="footer__icon-container--item-hide-desc"></div>
                  <div
                    className="footer__icon-container--item-desc-inner"
                    style={item.bgColor === '#fff' ? { color: '#333' } : null}
                  >
                    <p className="footer__icon-container--name">{item.name}</p>
                    <p className="footer__icon-container--describe">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer__text-container">
        <p>Actively seeking a full-time position of software engineer</p>
        <p>Contact me</p>
        <p>icons</p>
      </div>
    </footer>
  );
};
export default Footer;
