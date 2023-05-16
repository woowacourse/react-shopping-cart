import styled from "styled-components";
import cartImage from "../../assets/images/cart.png";
import { useState, useRef } from "react";
import cartProductsState from "../../store/cartProductAtom";
import { useRecoilState } from "recoil";

interface ProductQuantityInputProps {
  productId: number;
}

const ProductQuantityInput = ({ productId }: ProductQuantityInputProps) => {
  const [quantity, setQuantity] = useState(0);
  const isEditingRef = useRef(false);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);

  const updateInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(() => Number(e.target.value));

  const updateCartProducts = (e: React.FocusEvent<HTMLInputElement>) => {
    isEditingRef.current = false;
    setCartProducts({ ...cartProducts, [productId]: Number(e.target.value) });
  };

  const updateIsEditing = () => {
    isEditingRef.current = true;
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <ButtonContainer>
      {!isEditingRef.current && quantity === 0 ? (
        <Button type="button" onClick={updateIsEditing}>
          <ButtonIcon src={cartImage} />
        </Button>
      ) : (
        <Input
          type="number"
          value={quantity}
          onChange={updateInputQuantity}
          onBlur={updateCartProducts}
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
