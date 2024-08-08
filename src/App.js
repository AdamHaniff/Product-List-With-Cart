import data from "./js/data";

export default function App() {
  return (
    <div className="app">
      <Desserts />
      <Cart />
      <Modal />
    </div>
  );
}

function Desserts() {
  return (
    <div className="desserts">
      <h1 className="desserts__title">Desserts</h1>
      <ul className="desserts__container">
        {data.map((dessert) => (
          <Dessert key={dessert.name} dessert={dessert} />
        ))}
      </ul>
    </div>
  );
}

function Dessert({ dessert }) {
  const { mobile, tablet, desktop } = dessert.image;
  const { name, category, price } = dessert;

  return (
    <li className="dessert">
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
    </li>
  );
}

function Cart() {
  return (
    <div className="cart">
      <span className="cart__quantity">Your Cart (0)</span>
      {/* <CartEmpty /> */}
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
      <Items />
      <OrderTotalTextPrice />
      <CartOrder />
    </div>
  );
}

function Items() {
  return (
    <ul className="items">
      <Item />
      <Item />
      <Item />
    </ul>
  );
}

function Item() {
  const isModal = true;

  return (
    <li className="item">
      {isModal && (
        <img
          className="item__thumbnail"
          src="images/image-tiramisu-thumbnail.jpg"
          alt="Item thumbnail"
        />
      )}
      <div className="item__details">
        <span className="item__name">Classic Tiramisu</span>
        <div className="item__pricing">
          <span className="item__quantity">1x</span>
          <span className="item__price">@ $5.50</span>
          {!isModal && <span className="item__total-price">$5.50</span>}
        </div>
      </div>
      {isModal ? (
        <span className="item__total-price">$5.50</span>
      ) : (
        <button className="item__remove-btn">
          <svg
            className="item__remove-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
              fill="#AD8A85"
            />
            <path
              d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
              fill="#AD8A85"
            />
          </svg>
        </button>
      )}
    </li>
  );
}

function OrderTotalTextPrice() {
  return (
    <div className="order">
      <span className="order__total-text">Order Total</span>
      <span className="order__total-price">$46.50</span>
    </div>
  );
}

function CartOrder() {
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
      <OrderBtn>Confirm Order</OrderBtn>
    </div>
  );
}

function OrderBtn({ children }) {
  return (
    <button className="btn-order" type="button">
      {children}
    </button>
  );
}

function Modal() {
  return (
    <div className="modal">
      <div className="modal__icon-text">
        <img
          className="modal__confirmed-icon"
          src="images/icon-order-confirmed.svg"
          alt="Order confirmed icon with a green checkmark inside a green circle"
        />
        <div className="modal__text">
          <span className="modal__text-confirmed">Order Confirmed</span>
          <span className="modal__text-enjoy">
            We hope you enjoy your food!
          </span>
        </div>
      </div>
      <div className="modal__items-order">
        <Items />
        <OrderTotalTextPrice />
      </div>
      <OrderBtn>Start New Order</OrderBtn>
    </div>
  );
}
