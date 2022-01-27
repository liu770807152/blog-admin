import React, { useState } from 'react';
import footerData from '../../utils/footerData';
import './styles.scss';

const Footer = () => {
  const [active, setActive] = useState(null);

  return (
    <footer className="footer">
      <div className="flex justify-around">
        <div className="footer__box">
          <div className="footer__box--left-logo">
            <a href="/">
              <img className="logo" src="/logo_transparent.png" alt="logo"></img>
            </a>
          </div>
          <div className="footer__box--right-memu">
            <div>
              <span>Chris Liu</span>
            </div>
            <div>
              <span>Copyright © 2022</span>
            </div>
          </div>
        </div>
        <div className="tools__box">
          <div className="tools__box--inner">
            <div className="tools__box--list">
              {footerData.map((item) => (
                <div
                  className="tools__box--item"
                  onMouseEnter={() => setActive(item.id)}
                  onMouseLeave={() => setActive(null)}
                  key={item.id}
                  style={{
                    backgroundColor: `${active === item.id ? item.bgColor : ''}`,
                  }}
                >
                  <i
                    className="tools__box--icon"
                    style={{
                      backgroundImage: `url(${item.icon})`,
                    }}
                  />
                  <div className="tools__box--desc">
                    <div className="tools__box--hide-desc"></div>
                    <div
                      className="tools__box--inner"
                      style={item.bgColor === '#fff' ? { color: '#333' } : null}
                    >
                      <p className="tools__box--name">{item.name}</p>
                      <p className="tools__box--text">{item.description}</p>
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
