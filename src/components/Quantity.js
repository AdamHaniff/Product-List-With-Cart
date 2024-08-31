import { useState } from "react";

export default function Quantity({ dessert, onQuantityUpdate, cartItems }) {
  // STATE
  const [quantity, setQuantity] = useState(
    cartItems.find((item) => item.id === dessert.id).quantity
  );

  // HANDLER FUNCTIONS
  function handleQuantityChange(amount) {
    const newQuantity = quantity + amount;

    if (newQuantity > 0) {
      setQuantity((qty) => qty + amount);
      onQuantityUpdate(dessert.id, newQuantity);
    }
  }

  return (
    <div className="dessert__quantity fade-in">
      <button
        className="dessert__decrement-btn"
        type="button"
        onClick={() => handleQuantityChange(-1)}
      >
        <svg
          className="dessert__decrement-icon"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10.5" cy="10" r="8" fill="none" id="icon-bg" />
          <g id="Add to Cart - Subtract Icon">
            <path
              id="Vector"
              d="M10.5 2.5C14.625 2.5 18 5.875 18 10C18 14.125 14.625 17.5 10.5 17.5C6.375 17.5 3 14.125 3 10C3 5.875 6.375 2.5 10.5 2.5ZM10.5 1.25C5.6875 1.25 1.75 5.1875 1.75 10C1.75 14.8125 5.6875 18.75 10.5 18.75C15.3125 18.75 19.25 14.8125 19.25 10C19.25 5.1875 15.3125 1.25 10.5 1.25Z"
              fill="white"
            />
            <path
              id="Vector_2"
              d="M5.5 9.375H15.5V10.625H5.5V9.375Z"
              fill="white"
            />
          </g>
        </svg>
      </button>
      <span className="dessert__quantity-value">{quantity}</span>
      <button
        className="dessert__increment-btn"
        type="button"
        onClick={() => handleQuantityChange(1)}
      >
        <svg
          className="dessert__increment-icon"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10.5" cy="10" r="8" fill="none" id="icon-bg" />
          <g id="Add to Cart - Add Icon">
            <path
              id="Vector"
              d="M10.5 2.5C14.625 2.5 18 5.875 18 10C18 14.125 14.625 17.5 10.5 17.5C6.375 17.5 3 14.125 3 10C3 5.875 6.375 2.5 10.5 2.5ZM10.5 1.25C5.6875 1.25 1.75 5.1875 1.75 10C1.75 14.8125 5.6875 18.75 10.5 18.75C15.3125 18.75 19.25 14.8125 19.25 10C19.25 5.1875 15.3125 1.25 10.5 1.25Z"
              fill="white"
            />
            <path
              id="Vector_2"
              d="M15.5 9.375H11.125V5H9.875V9.375H5.5V10.625H9.875V15H11.125V10.625H15.5V9.375Z"
              fill="white"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
