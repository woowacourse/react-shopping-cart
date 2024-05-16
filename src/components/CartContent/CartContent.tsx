import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import TotalAmount from '../TotalAmount/TotalAmount';
import ProductList from '../ProductList/ProductList';
import Title from '../Title/Title';
import { fetchProductsSelector } from '../../recoil/selectors';
import styled from 'styled-components';
import { itemsState } from '../../recoil/atoms';

export const NoCartItemContainer = styled.p`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  text-align: center;
`;

function CartContent() {
  const fetchedItems = useRecoilValue(fetchProductsSelector);
  const [items, setItems] = useRecoilState(itemsState);

  useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItems, setItems]);

  return (
    <>
      {items.length !== 0 ? (
        <>
          <Title
            title="장바구니"
            subTitle={`현재 ${items.length}종류의 상품이 담겨있습니다.`}
          />
          <ProductList />
          <TotalAmount />
        </>
      ) : (
        <>
          <Title title="장바구니" />
          <NoCartItemContainer>
            장바구니에 담은 상품이 없습니다.
          </NoCartItemContainer>
        </>
      )}
    </>
  );
}

export default CartContent;
