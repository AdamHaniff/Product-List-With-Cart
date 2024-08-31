import Items from "./Items";
import OrderTotalTextPrice from "./OrderTotalTextPrice";
import CartOrder from "./CartOrder";

export default function CartFilled({
  cartItems,
  onRemoveFromCart,
  onConfirmOrderClick,
}) {
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
