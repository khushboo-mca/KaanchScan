import React, {useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";
import footer from '../assets/footer.png';
import footer1 from '../assets/footer1.png';
import '../styles/Footer.css'; 
import foot from '../assets/foot.png';
import foot1 from '../assets/foot1.png';
function Footer() {
   const { theme, toggleTheme } = useContext(ThemeContext);
  const logoFooter = theme ==="dark" ? foot : footer;
  const logoFooter1 = theme ==="dark" ? foot1 : footer1;
  return (
    <footer className="footer">
      {/* Top Links */}
      <div className="footer-top">
        <div className="footer-links">
          <a href="https://app.kaanch.com/faq">FAQs</a>
          <a href="https://docs.kaanch.network/">Docs</a>
          <a href="https://github.com/kaanch-inc/">Github</a>
          <a href="https://blog.kaanch.com/">Press</a>
        </div>
      </div>

      {/* Middle Images */}
      <div className="footer-middle">
        <img src={logoFooter} alt="footer" className="footer-img" />
        <img src={logoFooter1} alt="footer1" className="footer-img1 footer-img-secondary" />
      </div>
      {/* Bottom Text */}
      <div className="footer-bottom">
        <p>Kaanch Network &copy; 2025. All rights reserved.</p>
        <p className='term'>
          <a href="/terms">Terms and Conditions</a> | 
          <a href="/privacy"> Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
