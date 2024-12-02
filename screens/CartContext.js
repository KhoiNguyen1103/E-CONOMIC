import React, { createContext, useState, useContext } from 'react';

// Tạo context cho giỏ hàng
const CartContext = createContext();

// Provider để bọc ứng dụng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Trạng thái giỏ hàng
  const [removedItems, setRemovedItems] = useState([]); // Trạng thái các sản phẩm đã xóa

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity = 1) => {
if (!product.id || !product.name || !product.price) {
  console.error('Product must have id, name, and price to be added to the cart.');
  return;
}

setCart((prevCart) => {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = prevCart.find((item) => item.id === product.id);
  if (existingProduct) {
    // Nếu tồn tại, cập nhật số lượng
    return prevCart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  // Nếu chưa tồn tại, thêm sản phẩm mới
  return [
    ...prevCart,
    {
      id: product.id,
      name: product.name, // Đảm bảo đồng nhất tên sản phẩm
      quantity: quantity,
      price: product.price,
    },
  ];
});
};


  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productName) => {
    setCart((prevCart) => prevCart.filter((item) => item.productName !== productName));
    setRemovedItems((prevRemoved) => [...prevRemoved, productName]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, removedItems, setRemovedItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => useContext(CartContext);
