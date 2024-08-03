import data from "./js/data";

export default function App() {
  return <Desserts />;
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
  const { thumbnail, mobile, tablet, desktop } = dessert.image;
  const { name, category, price } = dessert;

  return (
    <div className="dessert">
      <picture>
        <source media="(min-width: 1440px)" srcSet={desktop} />
        <source media="(min-width: 768px)" srcSet={tablet} />
        <source srcSet={mobile} />
        <img className="dessert__img" src={mobile} alt={name} />
      </picture>
    </div>
  );
}
