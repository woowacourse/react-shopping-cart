import styled from "styled-components";
import cartImage from "../../assets/images/cart.png";
import { useState } from "react";
import cartProductsState from "../../store/cartProductAtom";
import { useRecoilState } from "recoil";

interface ProductQuantityInputProps {
  productId: number;
}

const ProductQuantityInput = ({ productId }: ProductQuantityInputProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  console.log(cartProducts);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(() => Number(e.target.value));
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    setCartProducts({ ...cartProducts, [productId]: Number(e.target.value) });
  };

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <ButtonContainer>
      {!isEditing && quantity === 0 ? (
        <Button type="button" onClick={handleButtonClick}>
          <ButtonIcon src={cartImage} />
        </Button>
      ) : (
        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  width: 54px;
  height: 25px;
  text-align: center;
`;

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

const Input = styled.input`
  width: 54px;
  height: 25px;
`;

export default ProductQuantityInput;
