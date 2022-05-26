import StyledImageButton from "./ImageButton.styled";

function ImageButton({ children, onClick }) {
  return (
    <StyledImageButton type="button" onClick={onClick}>
      {children}
    </StyledImageButton>
  );
}

export default ImageButton;
