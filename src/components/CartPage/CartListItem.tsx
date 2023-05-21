import styled from 'styled-components';

import QuantityCounter from '../common/QuantityCounter';
import CheckIconImage from '../../asset/check_icon.svg';
import useCount from '../../hooks/useCount';
import { Product } from '../../type/product';
import DeleteButton from './DeleteButton';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartSelects } from '../../atoms/cartSelects';
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
  const [check, setCheck] = useState(false);
  const [cartSelectsState, setCartSelectsState] = useRecoilState(cartSelects);
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

  useEffect(() => {
    setCheck(cartSelectsState.has(id));
  }, [cartSelectsState]);

  useEffect(() => {
    const newCartSelects = Array.from(cartSelectsState);
    const newCartSelectSet = new Set(newCartSelects);
    if (check) {
      newCartSelectSet.add(id);
    } else {
      newCartSelectSet.delete(id);
    }
    setCartSelectsState(newCartSelectSet);
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
        <Suspense fallback={<div>loading...</div>}>
          <QuantityCounter count={count} setCount={setCount} />
        </Suspense>
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
