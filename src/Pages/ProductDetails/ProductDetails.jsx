 


import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!selectedColor) {
      alert("Please select a color");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <main className="product-details">
      <img
        src={product.image}
        alt={product.name}
        className="product-details-image"
      />

      <div className="product-details-content">
        <h1>{product.name}</h1>

        <p className="product-details-price">
          {product.price.toFixed(2)} ج.م
        </p>

        <p className="product-details-description">
          {product.description}
        </p>

        <p className="product-details-category">
          Category: {product.category}
        </p>

        {/* Sizes */}

        <div className="product-option-section">
          <h3>Size</h3>

          <div className="product-options">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`product-option ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}

        <div className="product-option-section">
          <h3>Color</h3>

          <div className="product-options">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`product-option ${
                  selectedColor === color ? "selected" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}

        <div className="product-option-section">
          <h3>Quantity</h3>

          <div className="quantity-control">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity === 1}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
        </div>

        {/* Stock */}

        <p className="product-details-stock">
          {product.stock > 0
            ? `In Stock: ${product.stock}`
            : "Out of Stock"}
        </p>

        {/* Add To Cart */}

        <button
          type="button"
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;