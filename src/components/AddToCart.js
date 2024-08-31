export default function AddToCart({ dessert, onAddToCart }) {
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
