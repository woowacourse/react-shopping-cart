import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { removeCartItem } from '../../api';
import { itemDetailsState, itemsState } from '../../recoil/atoms';
import { Items } from '../../types/Item';
import { fetchCartItemQuantity } from '../../api';
import {
  updateLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../../utils/LocalStorage';
import * as S from './ItemCard.styled';
import ItemCardHeader from '../ItemCardHeader/ItemCardHeader';
import { PageType } from '../../types/Page';

interface ItemProps {
  item: Items;
  type: PageType;
}

function ItemCard({ item, type }: ItemProps) {
  const [details, setDetails] = useRecoilState(itemDetailsState(item.id));
  const setItems = useSetRecoilState(itemsState);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const localStorageList = getLocalStorage();
    const localStorageItem = localStorageList.find(
      (value) => value.id === item.id,
    );
    setDetails({
      quantity: item.quantity,
      price: item.product.price,
      isChecked: localStorageItem ? localStorageItem.isChecked : true,
    });
  }, [item.quantity, item.product.price, item.id]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        await fetchCartItemQuantity(item.id, details.quantity);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [details, item.id]);

  const handleDecreasedQuantity = () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: Math.max(prevQuantity.quantity - 1, 1),
    }));
  };

  const handleIncreasedQuantity = () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: prevQuantity.quantity + 1,
    }));
  };

  const handleRemoveItem = async (id: number) => {
    await removeCartItem(id);
    removeLocalStorage(id);
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleCheckedItem = () => {
    setDetails((prevState) => ({
      ...prevState,
      isChecked: !prevState.isChecked,
    }));

    updateLocalStorage({ id: item.id, isChecked: !details.isChecked });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <S.CardContainer>
      {type === 'cart' && (
        <ItemCardHeader
          isChecked={details.isChecked}
          id={item.id}
          handleCheckedItem={handleCheckedItem}
          handleRemoveItem={handleRemoveItem}
        />
      )}
      <S.CardContent>
        <S.ItemImg src={item.product.imageUrl} alt={item.product.name} />
        <S.CardDetail>
          <S.CardInfo>
            <S.ItemName>{item.product.name}</S.ItemName>
            <S.ItemPrice>{item.product.price.toLocaleString()}원</S.ItemPrice>
          </S.CardInfo>
          <S.CardQuantityButton>
            {type === 'cart' && (
              <S.Button onClick={handleDecreasedQuantity}>-</S.Button>
            )}
            <S.QuantityCount>
              {details.quantity}
              {type === 'order' && '개'}
            </S.QuantityCount>
            {type === 'cart' && (
              <S.Button onClick={handleIncreasedQuantity}>+</S.Button>
            )}
          </S.CardQuantityButton>
        </S.CardDetail>
      </S.CardContent>
    </S.CardContainer>
  );
}

export default ItemCard;
