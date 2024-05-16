import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import TotalAmount from '../TotalAmount/TotalAmount';
import ProductList from '../ProductList/ProductList';
import Title from '../Title/Title';
import { fetchProductsSelector } from '../../recoil/selectors';
import styled from 'styled-components';
import { itemsState } from '../../recoil/atoms';
import { MESSAGES, MESSAGES_PROPS } from '../../constants/Messages';

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
            title={MESSAGES.cart}
            subTitle={MESSAGES_PROPS.includedItems(items.length)}
          />
          <ProductList />
          <TotalAmount />
        </>
      ) : (
        <>
          <Title title={MESSAGES.cart} />
          <NoCartItemContainer>{MESSAGES.noItemsInCart}</NoCartItemContainer>
        </>
      )}
    </>
  );
}

export default CartContent;
