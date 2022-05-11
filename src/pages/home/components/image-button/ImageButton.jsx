import S from "../../styled";

function ImageButton({ children, onClick, included }) {
  return (
    <S.ImageButton
      className="add-cart-btn"
      type="button"
      onClick={onClick}
      {...(included ? { disabled: true } : {})}
    >
      {children}
    </S.ImageButton>
  );
}

export default ImageButton;
