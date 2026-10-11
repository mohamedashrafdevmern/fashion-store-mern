
import "./Home.css";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import { Link } from "react-router-dom";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">
            THE NEW SEASON — 2026
          </p>

          <h1>
            Style that
            <br />
            speaks <span>for you.</span>
          </h1>

          <p className="hero-description">
            Discover timeless essentials and modern silhouettes
            designed for every side of you.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-button">
              Explore Collection <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/products" className="hero-secondary-link">
              Discover the collection
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-line" />
            <p>EFFORTLESS STYLE. EVERY DAY.</p>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://img-lcwaikiki.mncdn.com/mnpadding/480/640/ffffff/pim/productimages/20262/9293576/v2/l_20262-w6j128z8-cvl-99-76-96-188_a.jpg"
            alt="Modern fashion collection"
          />

          <div className="hero-image-label">
            <span>NEW ARRIVALS</span>
            <span>01 / 26</span>
          </div>
        </div>

        <div className="hero-side-text" aria-hidden="true">
          FASHION — YOUR WAY
        </div>
      </section>

      <Categories />

      <FeaturedProducts />

        
{/* New Season Banner */}
<section className="season-banner">
  <img
    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85"
    alt="New season fashion collection"
    className="season-banner-image"
    loading="lazy"
  />

  <div className="season-banner-overlay">
    <p className="season-eyebrow">THE NEW SEASON</p>

    <h2>
      A New Season
      <br />
      <span>Begins Here.</span>
    </h2>

    <p className="season-description">
      Discover timeless pieces made for your own expression of style.
    </p>

    <Link to="/products" className="season-button">
      Explore the Collection <span>↗</span>
    </Link>
  </div>
</section>

{/* For Him & For Her */}
<section className="style-edit">
  <div className="style-edit-heading">
    <p className="style-eyebrow">MADE FOR EVERY YOU</p>
    <h2>
      Find Your <span>Style</span>
    </h2>
    <p>Two perspectives. One timeless wardrobe.</p>
  </div>

  <div className="style-edit-grid">
    <Link to="/products" className="style-edit-card">
      <img
        src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=85"
        alt="Modern men's fashion"
        loading="lazy"
      />

      <div className="style-edit-overlay">
        <p>THE MENSWEAR EDIT</p>
        <h3>For Him</h3>
        <span>Explore Menswear ↗</span>
      </div>
    </Link>

    <Link to="/products" className="style-edit-card">
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
        alt="Modern women's fashion"
        loading="lazy"
      />

      <div className="style-edit-overlay">
        <p>THE WOMENSWEAR EDIT</p>
        <h3>For Her</h3>
        <span>Explore Womenswear ↗</span>
      </div>
    </Link>
  </div>
</section>
        <CustomerReviews />
        <Footer />
    </main>
  );
}

export default Home;