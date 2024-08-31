import { useRef, useCallback, useEffect } from "react";
import { useKey } from "../hooks/useKey";
import Items from "./Items";
import OrderTotalTextPrice from "./OrderTotalTextPrice";
import OrderBtn from "./OrderBtn";

export default function Modal({ cartItems, onModalClose, setCartItems }) {
  // VARIABLES
  const modalEl = useRef(null);
  const overlayEl = useRef(null);

  // HANDLER FUNCTIONS
  const handleModalOverlayClose = useCallback(() => {
    modalEl.current.classList.remove("slide-up");
    modalEl.current.classList.add("fade-out");
    overlayEl.current.classList.add("fade-out");

    setTimeout(() => onModalClose(), 400);
  }, [onModalClose]);

  function handleNewOrderClick() {
    // Close modal and overlay
    handleModalOverlayClose();

    // Remove all items from the cart
    setTimeout(() => setCartItems([]), 400);
  }

  // EFFECTS
  useEffect(function () {
    // Don't allow the body to scroll when the modal is displayed
    document.body.classList.add("modal-open");

    return () => document.body.classList.remove("modal-open");
  }, []);

  // Close the modal and overlay when the 'Escape' key is pressed
  useKey("Escape", handleModalOverlayClose);

  return (
    <>
      <div className="modal slide-up" ref={modalEl}>
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
        <OrderBtn handleClick={handleNewOrderClick}>Start New Order</OrderBtn>
      </div>
      <div
        className="overlay fade-in"
        onClick={handleModalOverlayClose}
        ref={overlayEl}
      ></div>
    </>
  );
}
