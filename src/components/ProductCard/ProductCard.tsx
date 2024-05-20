import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { removeCartItem } from '../../api';
import { itemDetailsState, itemsState } from '../../recoil/atoms';
import { Products } from '../../types/Product';
import { fetchCartItemQuantity } from '../../api';
import CheckBox from '../CheckBox/CheckBox';
import {
  updateLocalStorage,
  getLocalStorage,
} from '../../utils/UpdateLocalStorage';
import { MESSAGES } from '../../constants/Messages';
import * as S from './ProductCard.styled';

interface ProductProps {
  product: Products;
}

function ProductCard({ product }: ProductProps) {
  const [details, setDetails] = useRecoilState(itemDetailsState(product.id));
  const setItems = useSetRecoilState(itemsState);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const localStorageList = getLocalStorage();
    const localStorageProduct = localStorageList.find(
      (value) => value.id === product.id,
    );
    setDetails({
      quantity: product.quantity,
      price: product.product.price,
      isChecked: localStorageProduct ? localStorageProduct.isChecked : true,
    });
  }, [product.quantity, product.product.price, setDetails, product.id]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        await fetchCartItemQuantity(product.id, details.quantity);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [details, product.id]);

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
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleCheckedItem = () => {
    setDetails((prevState) => ({
      ...prevState,
      isChecked: !prevState.isChecked,
    }));

    updateLocalStorage({ id: product.id, isChecked: !details.isChecked });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <S.CardContainer>
      <S.CardHeader>
        <CheckBox isChecked={details.isChecked} onClick={handleCheckedItem} />
        <S.Button onClick={() => handleRemoveItem(product.id)}>
          {MESSAGES.delete}
        </S.Button>
      </S.CardHeader>

      <S.CardContent>
        <S.ItemImg src={product.product.imageUrl} alt={product.product.name} />
        <S.CardDetail>
          <S.CardInfo>
            <S.ProductName>{product.product.name}</S.ProductName>
            <S.ProductPrice>
              {product.product.price.toLocaleString()}원
            </S.ProductPrice>
          </S.CardInfo>
          <S.CardQuantityButton>
            <S.Button onClick={handleDecreasedQuantity}>-</S.Button>
            <S.QuantityCount>{details.quantity}</S.QuantityCount>
            <S.Button onClick={handleIncreasedQuantity}>+</S.Button>
          </S.CardQuantityButton>
        </S.CardDetail>
      </S.CardContent>
    </S.CardContainer>
  );
}

export default ProductCard;
