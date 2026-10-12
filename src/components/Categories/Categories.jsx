import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categories.css";
import categories from "../../data/categories";

function Categories() {
  return (
    <section className="categories">
      <div className="categories-heading">
        <p className="categories-eyebrow">FIND YOUR STYLE</p>

        <h2>
          Shop by <span>Category</span>
        </h2>

        <p className="categories-description">
          Thoughtfully selected styles for every wardrobe.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
            link={category.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;