import OrderBtn from "./OrderBtn";

export default function CartOrder({ onConfirmOrderClick }) {
  // HANDLER FUNCTIONS
  const handleOrderBtnClick = () => onConfirmOrderClick();

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
