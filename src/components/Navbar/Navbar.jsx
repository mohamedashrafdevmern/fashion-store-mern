
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "./Navbar.css";
 import { useTheme } from "../../Context/ThemeContext";
 import { useAuth } from "../../Context/AuthContext";
function Navbar() {
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const handleLogout = () => {
  logout();
  setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
        SM 
        </Link>
        {/* Mobile Cart Button */}
          <Link to="/cart" className="mobile-cart-button">
           🛒
           {cartCount > 0 && (
             <span className="cart-count">{cartCount}</span>
           )}
         </Link>
          

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/orders">My Orders</Link>   
          {user?.role === "admin" && (<Link to="/admin">Admin Dashboard</Link>)}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">

          {user ? (
            <div className="navbar-user">
              <span>Hi, {user.name}</span>

              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-link">
                Register
              </Link>
            </div>
          )}

          <Link to="/cart" className="cart-button">
            🛒
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
                         </Link>
                              <button
                 type="button"
                 className="theme-toggle"
                 onClick={toggleTheme}
                 aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                 title={theme === "light" ? "Dark mode" : "Light mode"}
               >
                 {theme === "light" ? "☾" : "☀"}
               </button>


        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* Mobile Menu */}
      <nav className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/products" onClick={closeMenu}>
          Shop
        </Link>
                     <Link to="/orders" onClick={closeMenu}>
            My Orders
          </Link>
          
          {user?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu}>
              Admin Dashboard
            </Link>
          )}
          
           
        

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <div className="mobile-auth">
          {user ? (
            <>
              <span>Hi, {user.name}</span>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link to="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
                     


      </nav>
    </header>
  );
}

export default Navbar;