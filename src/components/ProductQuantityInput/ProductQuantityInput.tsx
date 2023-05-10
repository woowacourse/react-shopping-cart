import styled from "styled-components";
import cartImage from "../../assets/images/cart.png";

const ProductQuantityInput = () => {
  return (
    <Button type="button">
      <ButtonIcon src={cartImage} />
    </Button>
  );
};

const Button = styled.button`
  width: 24.99px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export default ProductQuantityInput;
