import * as S from './style';

import ShoppingCart from '@Asset/ShoppingCart.png';

import { Product, UpdateShoppingBasket } from '@Types/index';
import { useState } from 'react';

type QuantityControllerProps = {
  product: Product;
  quantity: number;
  updateShoppingBasket: UpdateShoppingBasket;
};

function QuantityController({ product, quantity, updateShoppingBasket }: QuantityControllerProps) {
  const [isBlur, setIsBlur] = useState(false);

  const handleClickButton = (type: 'plus' | 'minus') => {
    if (type === 'plus') updateShoppingBasket(product, quantity + 1);
    else updateShoppingBasket(product, quantity - 1);
  };

  const handleClickCartIcon = () => {
    updateShoppingBasket(product, 1);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (newValue > 99) return alert('한 계정당 한 품목을 100개 이상 구입할 수 없습니다.');

    updateShoppingBasket(product, newValue);
  };

  return quantity === 0 && !isBlur ? (
    <S.ShoppingCartIcon src={ShoppingCart} onClick={handleClickCartIcon}></S.ShoppingCartIcon>
  ) : (
    <S.Container>
      <S.QuantityInput
        type="number"
        value={quantity}
        onChange={handleChangeInput}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          event.target.select();
          setIsBlur(true);
        }}
        onBlur={() => {
          setIsBlur(false);
        }}
      />
      <S.ButtonWrapper>
        <S.QuantityControlButton onClick={() => handleClickButton('plus')} disabled={quantity >= 99}>
          ▲
        </S.QuantityControlButton>
        <S.QuantityControlButton onClick={() => handleClickButton('minus')} disabled={quantity <= 0}>
          ▼
        </S.QuantityControlButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

export default QuantityController;
