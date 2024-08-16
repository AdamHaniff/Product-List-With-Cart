import { useState, useEffect } from "react";
import data from "./js/data";

export default function App() {
  // STATE
  const [cartItems, setCartItems] = useState(function () {
    const storedValue = localStorage.getItem("cartItems");
    return storedValue ? JSON.parse(storedValue) : [];
  });

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

  function handleConfirmOrderClick() {
    setIsModalDisplayed(true);
  }

  function handleModalClose() {
    setIsModalDisplayed(false);
  }

  // SET UP LOCAL STORAGE
  useEffect(
    function () {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    [cartItems]
  );

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
        <Modal cartItems={cartItems} onModalClose={handleModalClose} />
      )}
    </div>
  );
}

function Desserts({ onAddToCart, cartItems, onQuantityUpdate }) {
  return (
    <div className="desserts">
      <h1 className="desserts__title">Desserts</h1>
      <ul className="desserts__container">
        {data.map((dessert) => (
          <Dessert
            key={dessert.id}
            dessert={dessert}
            onAddToCart={onAddToCart}
            cartItems={cartItems}
            onQuantityUpdate={onQuantityUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

function Dessert({ dessert, onAddToCart, cartItems, onQuantityUpdate }) {
  // VARIABLES
  const { mobile, tablet, desktop } = dessert.image;
  const { name, category, price } = dessert;
  const isAddedToCart = cartItems.map((item) => item.id).includes(dessert.id);

  return (
    <li className="dessert">
      <div className="dessert__image-container">
        <picture>
          <source media="(min-width: 1440px)" srcSet={desktop} />
          <source media="(min-width: 768px)" srcSet={tablet} />
          <source srcSet={mobile} />
          <img
            className={`dessert__img ${
              isAddedToCart ? "dessert__img--added" : ""
            }`}
            src={mobile}
            alt={name}
          />
        </picture>
        <div className="dessert__btn-container">
          {!isAddedToCart ? (
            <AddToCart dessert={dessert} onAddToCart={onAddToCart} />
          ) : (
            <Quantity
              dessert={dessert}
              onQuantityUpdate={onQuantityUpdate}
              cartItems={cartItems}
            />
          )}
        </div>
      </div>
      <div className="dessert__description">
        <span className="dessert__category">{category}</span>
        <span className="dessert__name">{name}</span>
        <span className="dessert__price">${price.toFixed(2)}</span>
      </div>
    </li>
  );
}

function AddToCart({ dessert, onAddToCart }) {
  return (
    <button
      className="dessert__cart-btn"
      type="button"
      onClick={() => onAddToCart(dessert)}
    >
      <img
        className="dessert__cart-icon"
        src="images/icon-add-to-cart.svg"
        alt="Cart icon"
      />
      <span className="dessert__cart-text">Add to Cart</span>
    </button>
  );
}

function Quantity({ dessert, onQuantityUpdate, cartItems }) {
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

function Cart({ cartItems, onRemoveFromCart, onConfirmOrderClick }) {
  const isCartEmpty = cartItems.length === 0;
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <span className="cart__quantity">Your Cart ({cartQuantity})</span>
      {isCartEmpty ? (
        <CartEmpty />
      ) : (
        <CartFilled
          cartItems={cartItems}
          onRemoveFromCart={onRemoveFromCart}
          onConfirmOrderClick={onConfirmOrderClick}
        />
      )}
    </div>
  );
}

function CartEmpty() {
  return (
    <div className="cart__empty">
      <img
        className="cart__empty-img"
        src="images/illustration-empty-cart.svg"
        alt="Illustration of a cake with a slice cut out"
      />
      <span className="cart__empty-text">
        Your added items will appear here
      </span>
    </div>
  );
}

function CartFilled({ cartItems, onRemoveFromCart, onConfirmOrderClick }) {
  return (
    <div className="cart__filled">
      <Items
        cartItems={cartItems}
        onRemoveFromCart={onRemoveFromCart}
        isModal={false}
      />
      <OrderTotalTextPrice cartItems={cartItems} />
      <CartOrder onConfirmOrderClick={onConfirmOrderClick} />
    </div>
  );
}

function Items({ cartItems, onRemoveFromCart, isModal }) {
  return (
    <ul className="items">
      {cartItems.map((dessert) => (
        <Item
          key={dessert.id}
          dessert={dessert}
          onRemoveFromCart={onRemoveFromCart}
          isModal={isModal}
        />
      ))}
    </ul>
  );
}

function Item({ dessert, onRemoveFromCart, isModal }) {
  const itemTotalPrice = (dessert.price * dessert.quantity).toFixed(2);
  const { name } = dessert;
  const { thumbnail } = dessert.image;

  return (
    <li className="item">
      {isModal && (
        <img className="item__thumbnail" src={thumbnail} alt={name} />
      )}
      <div className="item__details">
        <span className="item__name">{dessert.name}</span>
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

function OrderTotalTextPrice({ cartItems }) {
  const orderTotalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="order">
      <span className="order__total-text">Order Total</span>
      <span className="order__total-price">${orderTotalPrice}</span>
    </div>
  );
}

function CartOrder({ onConfirmOrderClick }) {
  // HANDLER FUNCTIONS
  function handleOrderBtnClick() {
    onConfirmOrderClick();
  }

  return (
    <div className="cart__order">
      <div className="cart__order-icon-delivery">
        <img
          className="cart__order-icon"
          src="images/icon-carbon-neutral.svg"
          alt="Tree icon representing carbon-neutral delivery"
        />
        <span className="cart__order-delivery">
          This is a
          <span className="cart__order-delivery-semi-bold">
            &nbsp;carbon-neutral&nbsp;
          </span>
          delivery
        </span>
      </div>
      <OrderBtn handleClick={handleOrderBtnClick}>Confirm Order</OrderBtn>
    </div>
  );
}

function OrderBtn({ children, handleClick }) {
  return (
    <button className="btn-order" type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

function Modal({ cartItems, onModalClose }) {
  function handleOverlayClick() {
    onModalClose();
  }

  return (
    <>
      <div className="modal slide-up">
        <div className="modal__icon-text">
          <img
            className="modal__confirmed-icon"
            src="images/icon-order-confirmed.svg"
            alt="Order confirmed icon with a green checkmark inside a green circle"
          />
          <div className="modal__text">
            <span className="modal__text-confirmed">Order Confirmed</span>
            <span className="modal__text-enjoy">
              We hope you enjoy your food!
            </span>
          </div>
        </div>
        <div className="modal__items-order">
          <Items cartItems={cartItems} isModal />
          <OrderTotalTextPrice cartItems={cartItems} />
        </div>
        <OrderBtn>Start New Order</OrderBtn>
      </div>
      <div className="overlay fade-in" onClick={handleOverlayClick}></div>
    </>
  );
}
