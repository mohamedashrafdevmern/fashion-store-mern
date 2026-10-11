

import { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "./ProductCard.css";

function ProductCard({ _id, name, image, price }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const product = {
  _id,
  name,
  image,
  price: Number(price),
  quantity: 1,
};

  return (
    <div className="product-card">
      <div className="card-content">
        <Link to={`/products/${_id}`}>
          <img
            src={image}
            alt={name}
            className="product-image"
          />
      

      
          <h3 className="product-name">{name}</h3>
        </Link>

        <p className="product-price">{price}ج.م</p>
    
     
       <button
        type="button"
        className="add-to-cart-button"
        onClick={() => {
        addToCart(product);
        setAdded(true);

        setTimeout(() => {
        setAdded(false);
        }, 1500);
        }}
        >
       {added ? "Added ✓" : "Add to Cart"}
      </button>
         <Link
         to={`/products/${_id}`}
         className="view-details-button"
         >
         View Details
         </Link>
      </div>
    </div>
  );
}

export default ProductCard;

