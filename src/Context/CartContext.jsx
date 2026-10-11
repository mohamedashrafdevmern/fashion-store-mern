

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
        );
      }

      return [...currentCart, product];
    });
  };

  const increaseQuantity = (productId, selectedSize, selectedColor) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId, selectedSize, selectedColor) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedSize, selectedColor) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item._id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;