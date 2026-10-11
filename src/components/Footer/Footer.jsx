
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            FASHION<span>.</span>
          </Link>

          <p className="footer-description">
            Timeless pieces. Modern style.
            Discover fashion that feels like you.
          </p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>SHOP</h3>
          <Link to="/products">All Products</Link>
          <Link to="/products">New Arrivals</Link>
          <Link to="/products">Men's Collection</Link>
          <Link to="/products">Women's Collection</Link>
        </div>

        <div className="footer-column">
          <h3>HELP</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/shipping">Shipping Information</Link>
          <Link to="/returns">Returns & Exchanges</Link>
          <Link to="/faq">FAQs</Link>
        </div>

        <div className="footer-column">
          <h3>ABOUT</h3>
          <Link to="/about">Our Story</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SM</p>
        <p>Designed for everyday elegance.</p>
      </div>
    </footer>
  );
}

export default Footer;
