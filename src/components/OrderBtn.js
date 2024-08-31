export default function OrderBtn({ children, handleClick }) {
  return (
    <button className="btn-order" type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
