import data from "../js/data";
import Dessert from "./Dessert";

export default function Desserts({ onAddToCart, cartItems, onQuantityUpdate }) {
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
