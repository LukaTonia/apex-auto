import React, { useState, useEffect } from "react";
import "./Footer.css";

var logos = [
  "/media/michelin.png",
  "/media/oil.png",
  "/media/sheliko.png",
  "/media/vartunia.png",
];

export default function Footer() {
  console.log('Footer render');
  const [index, setIndex] = useState(0);

  useEffect(function() {
    var interval = setInterval(function() {
      setIndex(function(prevIndex) { return (prevIndex + 1) % logos.length; });
    }, 2000);

    return function() { clearInterval(interval); };
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-components">
        <div className="sponsor-logos">
          <img src={logos[index]} alt="" className="Logo" key={index} />
        </div>

        <div className="contact-us">
          <h1 className="footer-header">Contact Us</h1>
          <p style={{ marginTop: "20px" }}>
            <b>Email:</b> apex-auto@gmail.com{" "}
          </p>
          <p>
            <b>Phone:</b> 555 12 34 56
          </p>
          <p>
            <b>Location:</b> Al.Kazbegis 32
          </p>
        </div>

        <div className="working-hours">
          <h1 className="footer-header">Working Hours</h1>
          <p>
            <b>Mon - Fri:</b> 09:00 AM - 07:00 PM
          </p>
          <p>
            <b>Saturday:</b> 10:00 AM - 04:00 PM
          </p>
          <p>
            <b>Sunday:</b> Closed
          </p>
        </div>

        <div className="why-us">
          <h1 className="footer-header">About us</h1>
          <p>
            <b>Quality:</b> 100% Original Parts
          </p>
          <p>
            <b>Warranty:</b> 1 Year Guarantee
          </p>
          <p>
            <b>Support:</b> Online Assistance
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>&copy; 2026 ApexAuto. All Rights Reserved.</p>
          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
