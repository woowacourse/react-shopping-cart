import styled from 'styled-components';

import { useRef } from 'react';

import { Product } from '../../types/Product';
import { Counter } from './Counter';
import { ShoppingCartIcon } from '../../assets/ShoppingCartIcon';
import { useCartList } from '../../hooks/useCartList';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const { cartList, addProductToCartList, removeProductFromCartList } =
    useCartList();
  const { getProductQuantityById, patchProductQuantity } = useLocalStorage();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    if (!(inputRef.current instanceof HTMLInputElement)) return;

    inputRef.current.stepUp();
    patchProductQuantity(id, Number(inputRef.current.value));
  };

  const handleDecrease = () => {
    if (!(inputRef.current instanceof HTMLInputElement)) return;

    inputRef.current.stepDown();

    if (Number(inputRef.current.value) <= 0) {
      removeProductFromCartList(id);
      return;
    }

    patchProductQuantity(id, Number(inputRef.current.value));
  };

  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt="상품 이미지" />
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{name}</Style.Name>
          <Style.Price>{price}원</Style.Price>
        </Style.NamePriceContainer>
        {cartList.includes(id) ? (
          <Counter
            ref={inputRef}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            initialValue={getProductQuantityById(id)}
          />
        ) : (
          <ShoppingCartIcon handleClick={() => addProductToCartList(id)} />
        )}
      </Style.DescriptionContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 283px;
    height: 358px;

    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Image: styled.img`
    width: 283px;
    height: 283px;
  `,
  DescriptionContainer: styled.div`
    width: 283px;

    display: flex;
    justify-content: space-between;
  `,
  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;

    width: 201px;
    gap: 10px;
  `,
  Name: styled.span`
    font-size: 16px;
  `,
  Price: styled.span`
    font-size: 20px;
  `,
};
