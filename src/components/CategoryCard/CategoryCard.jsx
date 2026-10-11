 
import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({ title, image, link }) {
  return (
    <article className="category-card">
      <Link to={link} className="category-link">
        <img
          src={image}
          alt={`${title} fashion collection`}
          className="category-image"
          loading="lazy"
        />

        <div className="category-overlay">
          <div className="category-card-content">
            <p className="category-label">EXPLORE COLLECTION</p>

            <h3 className="category-title">{title}</h3>

            <span className="category-cta">
              Shop Now <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default CategoryCard;
