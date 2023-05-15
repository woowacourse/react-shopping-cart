import styled from 'styled-components';

import { AddCartIc } from '../../asset';
import { useAddCart } from '../../hooks/useAddCart';
import QuantityCounter from '../common/QuantityCounter';
import { isForwardedRef, isRefCurrent } from '../../utils/refTypeGuard';

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
  const { isSelected, selectProductItem, addCartProductItem, quantityRef } =
    useAddCart();

  // TODO: 컴포넌트 밖으로 빼기
  const onClickAddCartButton = () => {
    if (!isForwardedRef(quantityRef)) return;
    if (!isRefCurrent(quantityRef.current)) return;
    // TODO: 조금 더 명확한 표현 찾기
    if (!+quantityRef.current.value) return;
    addCartProductItem(id);
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
          <QuantityCounter ref={quantityRef} />
        ) : (
          <CartButton onClick={selectProductItem}>
            <AddCartIc />
          </CartButton>
        )}
      </InfoBox>
      {isSelected && (
        <AddCartButton onClick={onClickAddCartButton}>
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
