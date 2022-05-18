function ImageButton({ children, onClick }) {
  return (
    <button className="add-cart-btn" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default ImageButton;
