import * as S from './style';

import { CartItem as CartItemType } from '../../../type';
import CheckBox from '../../../components/CheckBox/CheckBox';
import QuantityController from '../../../components/QuantityController/QuantityController';
import SmallButton from '../../../components/SmallButton/SmallButton';
import convertToLocaleAmount from '../../../utils/convertToLocalePrice';

interface CartItemProps {
  cartItem: CartItemType;
  isChecked: boolean;
  handleClickCheckBox: () => void;
  handleDelete: () => void;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
}

export default function CartItem({
  cartItem,
  isChecked,
  handleDelete,
  handleClickCheckBox,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartItemProps) {
  return (
    <S.CartItemContainer>
      <S.CardItemHeader>
        <CheckBox isChecked={isChecked} onClick={handleClickCheckBox} />
        <SmallButton buttonText="삭제" onClick={handleDelete} />
      </S.CardItemHeader>
      <S.CardItemContent>
        <S.ProductImageBox src={cartItem.product.imageUrl} alt={cartItem.product.name} />
        <S.ProductInfoBox>
          <div>
            <S.ProductName>{cartItem.product.name}</S.ProductName>
            <S.ProductPrice>{convertToLocaleAmount(cartItem.product.price)}</S.ProductPrice>
          </div>
          <QuantityController
            quantity={cartItem.quantity}
            minQuantity={1}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
        </S.ProductInfoBox>
      </S.CardItemContent>
    </S.CartItemContainer>
  );
}
