import { useState, useEffect } from "react";

export default function Item({ dessert, onRemoveFromCart, isModal }) {
  // STATE
  const [modalItemName, setModalItemName] = useState(dessert.name);

  // VARIABLES
  const { thumbnail } = dessert.image;
  const itemTotalPrice = (dessert.price * dessert.quantity).toFixed(2);
  const truncatedWord =
    dessert.name.length > 20 ? dessert.name.slice(0, 20) + "..." : dessert.name;

  // EFFECTS
  useEffect(
    function () {
      const mediaQuery = window.matchMedia("(min-width: 400px)");

      // Function to handle media query change
      function handleMediaChange(e) {
        if (e.matches) {
          setModalItemName(dessert.name);
        } else {
          setModalItemName(truncatedWord);
        }
      }

      // Check the initial state and add the listener
      handleMediaChange(mediaQuery);
      mediaQuery.addEventListener("change", handleMediaChange);

      // Clean up the event listener
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    },
    [dessert.name, truncatedWord]
  );

  return (
    <li className="item">
      {isModal && (
        <img className="item__thumbnail" src={thumbnail} alt={dessert.name} />
      )}
      <div className="item__details">
        <span className="item__name">
          {isModal ? modalItemName : dessert.name}
        </span>
        <div className="item__pricing">
          <span className="item__quantity">{dessert.quantity}x</span>
          <span className="item__price">@ {dessert.price.toFixed(2)}</span>
          {!isModal && (
            <span className="item__total-price">${itemTotalPrice}</span>
          )}
        </div>
      </div>
      {isModal ? (
        <span className="item__total-price">${itemTotalPrice}</span>
      ) : (
        <button
          className="item__remove-btn"
          onClick={() => onRemoveFromCart(dessert.id)}
        >
          <svg
            className="item__remove-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
              fill="#AD8A85"
            />
            <path
              d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
              fill="#AD8A85"
            />
          </svg>
        </button>
      )}
    </li>
  );
}
