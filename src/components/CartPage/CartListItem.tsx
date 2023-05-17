import styled from 'styled-components';

import type { Product } from '../../type/product';
import DeleteButtonImage from '../../asset/delete_icon.png';
import QuantityCounter from '../common/QuantityCounter';
import CheckIconImage from '../../asset/check_icon.svg';
import useCount from '../../hooks/useCount';

interface CartListItemProps extends Product {}
export default function CartListItem({
  imageUrl,
  name,
  price,
}: CartListItemProps) {
  const { count, setCount } = useCount();
  return (
    <CartListItemContainer>
      <CartInfoContainer>
        <SelectBox type='checkbox' />
        <ProductImg src={imageUrl} />
        <ProductName>{name}</ProductName>
      </CartInfoContainer>
      <CartOptionContainer>
        <DeleteButton>
          <DeleteButtonIcon src={DeleteButtonImage} />
        </DeleteButton>
        <QuantityCounter count={count} setCount={setCount} />
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
      </CartOptionContainer>
    </CartListItemContainer>
  );
}

const CartListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 0;
`;

const CartInfoContainer = styled.div`
  display: flex;
`;

const ProductImg = styled.img`
  width: 14.4rem;
  height: 14.7rem;
`;

const ProductName = styled.p`
  ${({ theme }) => theme.fonts.cartProductName}
`;

const DeleteButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  background-color: transparent;
  cursor: pointer;
`;

const DeleteButtonIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.fonts.cartProductPrice}
`;

const SelectBox = styled.input`
  appearance: none;
  width: 2.8rem;
  height: 2.8rem;
  border: 1px solid ${({ theme }) => theme.colors.blue_green};
  border-radius: 2px;
  cursor: pointer;

  &:checked {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    background-image: url(${CheckIconImage});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CartOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;
