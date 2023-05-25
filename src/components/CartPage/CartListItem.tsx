import styled from 'styled-components';

import QuantityCounter from '../common/QuantityCounter';
import CheckIconImage from '../../asset/check_icon.svg';
import useCount from '../../hooks/useCount';
import { Product } from '../../type/product';
import DeleteButton from './DeleteButton';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartSelectsState } from '../../atoms/cartSelects';
import { cartRequestAction } from '../../atoms/cartState';

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
  const [cartSelects, setCartSelects] = useRecoilState(cartSelectsState);
  const setRequestAction = useSetRecoilState(
    cartRequestAction({ action: 'GET' })
  );

  let countDebounceId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (countDebounceId.current) {
      clearTimeout(countDebounceId.current);
    }
    countDebounceId.current = setTimeout(() => {
      setRequestAction({
        action: 'PATCH',
        payload: { cartId: id, quantity: count.value },
      });
    }, 400);
  }, [count, setRequestAction]);

  return (
    <CartListItemContainer>
      <CartInfoContainer>
        <SelectBox
          type='checkbox'
          checked={cartSelects.has(id)}
          onChange={() => {
            const newCartSelects = Array.from(cartSelects);
            const newCartSelectSet = new Set(newCartSelects);

            if (!cartSelects.has(id)) {
              newCartSelectSet.add(id);
            } else {
              newCartSelectSet.delete(id);
            }
            setCartSelects(newCartSelectSet);
            console.log('change', newCartSelectSet);
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
