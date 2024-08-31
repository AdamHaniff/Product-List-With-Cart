export default function OrderTotalTextPrice({ cartItems }) {
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
