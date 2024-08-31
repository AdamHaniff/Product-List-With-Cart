import { useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import Desserts from "./Desserts";
import Cart from "./Cart";
import Modal from "./Modal";

export default function App() {
  // STATE
  const [cartItems, setCartItems] = useLocalStorageState([], "cartItems");
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  // HANDLER FUNCTIONS
  function handleAddToCart(dessert) {
    setCartItems((cartItems) => [...cartItems, { ...dessert, quantity: 1 }]);
  }

  function handleQuantityUpdate(id, newQuantity) {
    setCartItems((cartItems) => {
      return cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  }

  function handleRemoveFromCart(id) {
    setCartItems((cartItems) =>
      cartItems.filter((dessert) => dessert.id !== id)
    );
  }

  const handleConfirmOrderClick = () => setIsModalDisplayed(true);

  const handleModalClose = () => setIsModalDisplayed(false);

  return (
    <div className="app">
      <Desserts
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        onQuantityUpdate={handleQuantityUpdate}
      />
      <Cart
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onConfirmOrderClick={handleConfirmOrderClick}
      />
      {isModalDisplayed && (
        <Modal
          cartItems={cartItems}
          onModalClose={handleModalClose}
          setCartItems={setCartItems}
        />
      )}
    </div>
  );
}
