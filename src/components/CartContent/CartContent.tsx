import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import TotalAmount from '../TotalAmount/TotalAmount';
import ItemList from '../ItemList/ItemList';
import Title from '../Title/Title';
import { fetchItemsSelector } from '../../recoil/selectors';
import { itemsState } from '../../recoil/atoms';
import { MESSAGES, MESSAGES_PROPS } from '../../constants/Messages';
import * as S from './CartContent.styled';
import { getLocalStorage, updateLocalStorage } from '../../utils/LocalStorage';

function CartContent() {
  const fetchedItems = useRecoilValue(fetchItemsSelector);
  const [items, setItems] = useRecoilState(itemsState);

  useEffect(() => {
    setItems(fetchedItems);
    const localStorageItems = getLocalStorage();
    if (!localStorageItems.length) {
      fetchedItems.forEach((item) =>
        updateLocalStorage({ id: item.id, isChecked: true }),
      );
    }
  }, [fetchedItems]);

  return (
    <>
      {items.length !== 0 ? (
        <>
          <Title
            title={MESSAGES.cart}
            subTitle={MESSAGES_PROPS.includedItems(items.length)}
          />
          <ItemList type="cart" />
          <TotalAmount />
        </>
      ) : (
        <>
          <Title title={MESSAGES.cart} />
          <S.NoCartItemContainer>
            {MESSAGES.noItemsInCart}
          </S.NoCartItemContainer>
        </>
      )}
    </>
  );
}

export default CartContent;
