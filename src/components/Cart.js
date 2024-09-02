import CartEmpty from "./CartEmpty";
import CartFilled from "./CartFilled";

export default function Cart({
  cartItems,
  onRemoveFromCart,
  onConfirmOrderClick,
}) {
  // VARIABLES 
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
