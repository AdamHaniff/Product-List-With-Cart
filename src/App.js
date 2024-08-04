import data from "./js/data";

export default function App() {
  return (
    <div className="app">
      <Desserts />
      <Cart />
    </div>
  );
}

function Desserts() {
  return (
    <div className="desserts">
      <h1 className="desserts__title">Desserts</h1>
      <div className="desserts__container">
        {data.map((dessert) => (
          <Dessert key={dessert.name} dessert={dessert} />
        ))}
      </div>
    </div>
  );
}

function Dessert({ dessert }) {
  const { mobile, tablet, desktop } = dessert.image;
  const { name, category, price } = dessert;

  return (
    <div className="dessert">
      <div className="dessert__image-container">
        <picture>
          <source media="(min-width: 1440px)" srcSet={desktop} />
          <source media="(min-width: 768px)" srcSet={tablet} />
          <source srcSet={mobile} />
          <img className="dessert__img" src={mobile} alt={name} />
        </picture>
        <button className="dessert__cart-btn" type="button">
          <img
            className="dessert__cart-icon"
            src="images/icon-add-to-cart.svg"
            alt="Cart icon"
          />
          <span className="dessert__cart-text">Add to Cart</span>
        </button>
      </div>
      <div className="dessert__description">
        <span className="dessert__category">{category}</span>
        <span className="dessert__name">{name}</span>
        <span className="dessert__price">${price.toFixed(2)}</span>
      </div>
    </div>
  );
}

function Cart() {
  return (
    <div className="cart">
      <span className="cart__quantity">Your Cart (0)</span>
      <CartEmpty />
      <CartFilled />
    </div>
  );
}

function CartEmpty() {
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

function CartFilled() {
  return (
    <div className="cart__filled">
      <div className="cart__items">
        <Item />
        <Item />
        <Item />
      </div>
      <CartOrder />
    </div>
  );
}

function Item() {
  return (
    <div className="item">
      <div className="item__details">
        <span className="item__name">Classic Tiramisu</span>
        <div className="item__pricing">
          <span className="item__quantity">1x</span>
          <span className="item__price">@ $5.50</span>
          <span className="item__total-price">$5.50</span>
        </div>
      </div>
      <button className="item__remove-btn">
        <img
          className="item__remove-icon"
          src="images/icon-remove-item.svg"
          alt="Remove icon"
        />
      </button>
    </div>
  );
}

function CartOrder() {
  return (
    <div className="cart__order">
      <div className="cart__order-text-price">
        <span className="cart__order-total-text">Order Total</span>
        <span className="cart__order-total-price">$46.50</span>
      </div>
      <div className="cart__order-icon-delivery">
        <img
          className="cart__order-icon"
          src="images/icon-carbon-neutral.svg"
          alt="Tree icon representing carbon-neutral delivery"
        />
        <span className="cart__order-delivery">
          This is a
          <span className="cart__order-delivery-bold"> carbon-neutral </span>
          delivery
        </span>
      </div>
      <button className="cart__order-btn">Confirm Order</button>
    </div>
  );
}
