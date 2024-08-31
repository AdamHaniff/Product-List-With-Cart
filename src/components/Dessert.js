import AddToCart from "./AddToCart";
import Quantity from "./Quantity";

export default function Dessert({
  dessert,
  onAddToCart,
  cartItems,
  onQuantityUpdate,
}) {
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
