import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AddCartIc } from "../../asset";
import { cartState } from "../../atoms/cartState";
import { CartType } from "../../type/cart";
import QuantityCounter from "../common/QuantityCounter";

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}
// TODO: 원단위 표시
export default function ProductItem({
  id,
  imageUrl,
  name,
  price,
}: ProductItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [cart, setCart] = useRecoilState<CartType[]>(cartState);
  const quantityRef = useRef<HTMLInputElement>(null);
  const selectProductItem = () => {
    setIsSelected(true);
  };

  const addCartProductItem = () => {
    setIsSelected(false);
    const cartItem: CartType = {
      productId: id,
      quantity: 0,
    };
    if (quantityRef.current) {
      cartItem.quantity = +quantityRef.current.value;
    }

    setCart((prev) => [...prev, cartItem]);
  };

  return (
    <ProductItemContainer>
      <ProductImage src={imageUrl} />
      <InfoBox>
        <ProductInfo>
          <Name>{name}</Name>
          <Price>{price.toLocaleString()}원</Price>
        </ProductInfo>
        {isSelected ? (
          <>
            <QuantityCounter ref={quantityRef} />
            <button onClick={addCartProductItem}>확인</button>
          </>
        ) : (
          <AddCartButton onClick={selectProductItem}>
            <AddCartIc />
          </AddCartButton>
        )}
      </InfoBox>
    </ProductItemContainer>
  );
}

// width: 28.2rem;
const ProductItemContainer = styled.li``;

const ProductImage = styled.img`
  width: 28.2rem;
  height: 28.2rem;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1.8rem 1rem 0;
`;

const ProductInfo = styled.div``;

const Name = styled.p`
  ${({ theme }) => theme.fonts.name}
`;

const Price = styled.p`
  ${({ theme }) => theme.fonts.price}
`;

const AddCartButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: transparent;
`;
