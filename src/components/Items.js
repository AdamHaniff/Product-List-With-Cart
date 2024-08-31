import Item from "./Item";

export default function Items({ cartItems, onRemoveFromCart, isModal }) {
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
