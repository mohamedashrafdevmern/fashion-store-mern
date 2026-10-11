
import { useEffect, useState } from "react";
import "./FeaturedProduct.css";
import ProductCard from "../ProductCard/ProductCard";

function FeaturedProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <section className="featured-products">
            <h2>Featured Products</h2>

            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        _id={product._id}
                        key={product._id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedProducts;