
import { Routes, Route } from "react-router-dom";
import OrderDetails from "./Pages/Orders/OrderDetails";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import Navbar from "./components/Navbar/Navbar";
import Order from "./Pages/Orders/Order";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import About from "./Pages/About/About";
import { ThemeProvider } from "./Context/ThemeContext";
function App() {
  return (
     <ThemeProvider>
    <>
      <Navbar />
          
      <Routes>
        <Route path="/" element={<Home />} /> 
                   
        <Route path="/products" element={<Products />} />          
                                             
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        
        
        <Route path="/orders" element={<Order />} />
        <Route
        path="/checkout"
        element={
       <ProtectedRoute>
       <Checkout />
       </ProtectedRoute>
       }
      />
 
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/order-success" element={<OrderSuccess />} />      
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:id"element={<OrderDetails />}/>
        <Route path="/admin"element={<AdminDashboard />}/>
        <Route path="/admin"element={<AdminDashboard />}/>
      </Routes>
    </>
    </ThemeProvider>
  );
}

export default App;

