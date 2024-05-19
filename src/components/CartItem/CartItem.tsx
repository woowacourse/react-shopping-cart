import * as S from './style';

import CheckBox from '../CheckBox/CheckBox';
import { Product } from '../../type';
import QuantityController from '../QuantityController/QuantityController';
import SmallButton from '../SmallButton/SmallButton';
import convertToLocaleAmount from '../../utils/convertToLocalePrice';
import { itemQuantityState } from '../../recoil/atoms';
import useCheckedItemIds from '../../hooks/useCheckedItemIds';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  quantity: number;
  handleDelete: (cartItemId: number) => void;
  handleIncreaseQuantity: (cartItemId: number, quantity: number) => void;
  handleDecreaseQuantity: (cartItemId: number, quantity: number) => void;
}

export default function CartItem({
  cartItemId,
  product,
  quantity,
  handleDelete,
  handleClickCheckBox,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useRecoilState(itemQuantityState(cartItemId));
  const { getIsChecked, checkId, uncheckId } = useCheckedItemIds();

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  const handelClickCheckBox = () => {
    getIsChecked(cartItemId) ? uncheckId(cartItemId) : checkId(cartItemId);
  };

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

  const handleClickDeleteButton = () => {
    handleDelete(cartItemId);
  };

  return (
    <S.CartItemContainer>
      <S.CardItemHeader>
        <CheckBox isChecked={getIsChecked(cartItemId)} onClick={handelClickCheckBox} />
        <SmallButton buttonText="삭제" onClick={handleClickDeleteButton} />
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
