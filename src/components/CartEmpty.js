export default function CartEmpty() {
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
