import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import TotalAmount from '../TotalAmount/TotalAmount';
import ItemList from '../ItemList/ItemList';
import Title from '../Title/Title';
import { itemsState } from '../../recoil/atoms';
import { MESSAGES, MESSAGES_PROPS } from '../../constants/Messages';
import * as S from './CartContent.styled';
import { getLocalStorage, updateLocalStorage } from '../../utils/LocalStorage';
import { addAdidas, addCoke, addNike, fetchItems } from '../../api';

function CartContent() {
  const [items, setItems] = useRecoilState(itemsState);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();

    const localStorageItems = getLocalStorage();
    if (!localStorageItems.length) {
      items.forEach((item) =>
        updateLocalStorage({ id: item.id, isChecked: true }),
      );
    }
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <S.CartContentContainer>
      <div>
        <S.SampleButton onClick={() => addNike()}>나이키</S.SampleButton>
        <S.SampleButton onClick={() => addAdidas()}>아디다스</S.SampleButton>
        <S.SampleButton onClick={() => addCoke()}>코카콜라</S.SampleButton>
      </div>
      {items.length !== 0 ? (
        <>
          <Title
            title={MESSAGES.cart}
            subTitle={MESSAGES_PROPS.includedItems(items.length)}
          />
          <S.ItemListWrapper>
            <ItemList type="cart" />
          </S.ItemListWrapper>
          <TotalAmount type="cart" />
        </>
      ) : (
        <>
          <Title title={MESSAGES.cart} />
          <S.NoCartItemContainer>
            {MESSAGES.noItemsInCart}
          </S.NoCartItemContainer>
        </>
      )}
    </S.CartContentContainer>
  );
}

export default CartContent;
