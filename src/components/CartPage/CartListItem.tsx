import styled from 'styled-components';

import QuantityCounter from '../common/QuantityCounter';
import CheckIconImage from '../../asset/check_icon.svg';
import useCount from '../../hooks/useCount';
import { Product } from '../../type/product';
import DeleteButton from './DeleteButton';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartSelects } from '../../atoms/cartSelects';

interface CartListItemProps {
  id: number;
  quantity: number;
  product: Product;
}

export default function CartListItem({
  id,
  quantity,
  product,
}: CartListItemProps) {
  const { count, setCount } = useCount(quantity);
  const { name, imageUrl, price } = product;
  const [check, setCheck] = useState(false);
  const [cartSelectsState, setCartSelectsState] = useRecoilState(cartSelects);

  useEffect(() => {
    setCheck(cartSelectsState.has(id));
  }, [cartSelectsState]);

  // TODO: 로직 에러
  useEffect(() => {
    if (check) {
      const newCartSelects = [...cartSelectsState];
      const newCartSelectSet = new Set(newCartSelects);
      newCartSelectSet.add(id);
      setCartSelectsState(newCartSelectSet);
    } else {
      const newCartSelects = [...cartSelectsState];
      const newCartSelectSet = new Set(newCartSelects);
      newCartSelectSet.delete(id);
      setCartSelectsState(newCartSelectSet);
    }
  }, [check]);

  return (
    <CartListItemContainer>
      <CartInfoContainer>
        <SelectBox
          type='checkbox'
          checked={check}
          onChange={() => {
            setCheck((check) => !check);
          }}
        />
        <ProductImg src={imageUrl} />
        <ProductName>{name}</ProductName>
      </CartInfoContainer>
      <CartOptionContainer>
        <DeleteButton cartId={id} />
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
