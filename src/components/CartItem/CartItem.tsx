import * as S from './style';

import CheckBox from '../CheckBox/CheckBox';
import { Product } from '../../type';
import QuantityController from '../QuantityController/QuantityController';
import SmallButton from '../SmallButton/SmallButton';
import convertToLocaleAmount from '../../utils/convertToLocalePrice';
import { itemQuantityState } from '../../recoil/atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  quantity: number;
  isChecked: boolean;
  handleClickCheckBox: () => void;
  handleDelete: () => void;
  handleIncreaseQuantity: (cartItemId: number, quantity: number) => void;
  handleDecreaseQuantity: (cartItemId: number, quantity: number) => void;
}

export default function CartItem({
  cartItemId,
  product,
  quantity,
  isChecked,
  handleDelete,
  handleClickCheckBox,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useRecoilState(itemQuantityState(cartItemId));

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  const handleClickIncreaseQuantity = () => {
    const quantity = itemQuantity + 1;
    setItemQuantity(quantity);
    handleIncreaseQuantity(cartItemId, quantity);
  };

  const handleClickDecreaseQuantity = () => {
    const quantity = Math.max(1, itemQuantity - 1);
    setItemQuantity(quantity);
    handleDecreaseQuantity(cartItemId, quantity);
  };

  return (
    <S.CartItemContainer>
      <S.CardItemHeader>
        <CheckBox isChecked={isChecked} onClick={handleClickCheckBox} />
        <SmallButton buttonText="삭제" onClick={handleDelete} />
      </S.CardItemHeader>
      <S.CardItemContent>
        <S.ProductImageBox src={product.imageUrl} alt={product.name} />
        <S.ProductInfoBox>
          <div>
            <S.ProductName>{product.name}</S.ProductName>
            <S.ProductPrice>{convertToLocaleAmount(product.price)}</S.ProductPrice>
          </div>
          <QuantityController
            quantity={itemQuantity}
            minQuantity={1}
            handleIncreaseQuantity={handleClickIncreaseQuantity}
            handleDecreaseQuantity={handleClickDecreaseQuantity}
          />
        </S.ProductInfoBox>
      </S.CardItemContent>
    </S.CartItemContainer>
  );
}
