import styled from "styled-components";
import { AddCartIc } from "../../asset";

import { useAddCart } from "../../hooks/useAddCart";
import { useAddProductCount } from "../../hooks/useAddProductCount";
import useFetch from "../../hooks/useFetch";
import QuantityCounter from "../common/QuantityCounter";

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default function ProductItem({
  id,
  imageUrl,
  name,
  price,
}: ProductItemProps) {
  const { isSelected, selectProductItem, checkInitAddProduct } = useAddCart();
  const { count, getCount, increaseQuantity, decreaseQuantity } =
    useAddProductCount();
  const { addProductToCart } = useFetch();

  async function handleAddButtonClick() {
    if (!checkInitAddProduct(id)) {
      alert("이미 추가된 상품입니다");
      selectProductItem();
      return;
    }

    addProductToCart({
      id: id,
      quantity: count,
      product: {
        id: id,
        name: name,
        price: price,
        imageUrl: imageUrl,
      },
    });
    selectProductItem();
  }

  return (
    <ProductItemContainer data-testId="product-item">
      <ProductImage src={imageUrl} />
      <InfoBox>
        <ProductInfo>
          <Name>{name}</Name>
          <Price>{price.toLocaleString()}원</Price>
        </ProductInfo>
        {isSelected ? (
          <QuantityCounter
            count={count}
            getCount={getCount}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            id={id}
          />
        ) : (
          <CartButton onClick={selectProductItem}>
            <AddCartIc />
          </CartButton>
        )}
      </InfoBox>
      {isSelected && (
        <AddCartButton onClick={handleAddButtonClick}>
          장바구니 추가
        </AddCartButton>
      )}
    </ProductItemContainer>
  );
}

const ProductItemContainer = styled.li`
  width: 28.2rem;
`;

const ProductImage = styled.img`
  width: 28.2rem;
  height: 28.2rem;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.8rem 0;
`;

const ProductInfo = styled.div``;

const Name = styled.p`
  ${({ theme }) => theme.fonts.name}
`;

const Price = styled.p`
  ${({ theme }) => theme.fonts.price}
`;

const CartButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: transparent;
`;

const AddCartButton = styled.button`
  width: 100%;
  height: 4rem;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;
