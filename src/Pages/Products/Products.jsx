
 // importing necessary modules and components
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";           
import {useState,useEffect} from "react";    
                                                      
function Products() {               
   // states 
  const [selectedCategory, setSelectedCategory] = useState("all");       
  const [searchTerm, setSearchTerm] = useState("");             
  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setpriceFilter] = useState("all"); // New state for price filter
  const [products, setProducts] = useState([]);
    // fetching products from the backend API
    useEffect(() => {
  fetch("http://localhost:5001/api/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);
   // filtering and sorting products based on selected category, search term, sort option, and price filter
   const filteredProducts = products
  .filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under-600" && product.price < 600) ||
      (priceFilter === "600-1000" &&
        product.price >= 600 &&
        product.price <= 1000) ||
      (priceFilter === "above-1000" && product.price > 1000);

    return matchesSearch && matchesCategory && matchesPrice;
  })
  .sort((a, b) => {
    if (sortOption === "low-high") {
      return a.price - b.price;
    }

    if (sortOption === "high-low") {
      return b.price - a.price;
    }

    return 0;
  });
   // rendering the products page with category filter, search bar, sort options, and product cards
  return (
   
    <main className="products-page">
      <h1>All Products</h1>
     <div className="category-filter">
  <button
    className={selectedCategory === "all" ? "active" : ""}
    onClick={() => setSelectedCategory("all")}
  >
    All
  </button>

  <button
    className={selectedCategory === "t-shirts" ? "active" : ""}
    onClick={() => setSelectedCategory("t-shirts")}
  >
    T-Shirts
  </button>

  <button
    className={selectedCategory === "suits" ? "active" : ""}
    onClick={() => setSelectedCategory("suits")}
  >
    Suits
  </button>
</div>
       <input
         type="text"
         placeholder="Search products..."
         value={searchTerm}
         onChange={(event) => setSearchTerm(event.target.value)}
         className="products-search"
/>
<select
  value={sortOption}
  onChange={(event) => setSortOption(event.target.value)}
  className="products-sort"
>
  <option value="default">Sort by</option>
  <option value="low-high">Price: Low to High</option>
  <option value="high-low">Price: High to Low</option>
</select>
   <select value={priceFilter} onChange={(event) => setpriceFilter(event.target.value)} className="products-price-filter">
  <option value="all">All Prices</option>
  <option value="under-600">Under 600</option>
  <option value="600-1000">600 - 1000</option>
  <option value="above-1000">Above 1000</option>
</select>
<p className="products-count">
  {filteredProducts.length} products found
</p>
    <div className="products-grid">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <ProductCard
        _id={product._id}
        key={product._id}
        name={product.name}
        image={product.image}
        price={product.price}
      />
    ))
  ) : (
    <p className="no-products">No products found.</p>
  )}
</div>
    </main>
  );
}

export default Products;

