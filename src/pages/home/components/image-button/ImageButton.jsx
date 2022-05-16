import StyledImageButton from "@/pages/home/components/image-button/ImageButton.styled";

function ImageButton({ children, onClick, included }) {
  return (
    <StyledImageButton
      className="add-cart-btn"
      type="button"
      onClick={onClick}
      {...(included ? { disabled: true } : {})}
    >
      {children}
    </StyledImageButton>
  );
}

export default ImageButton;
