import { TCartItem } from '../../pages/ShoppingCartPage/ShoppingCartPage.type';
import CheckButton from '../Button/CheckButton/CheckButton';
import { CheckIcon, PlusIcon, MinusIcon } from '../../assets';

import * as S from './CartItem.style';

interface CardItemProps {
  item: TCartItem;
}

function CartItem({ item }: CardItemProps) {
  const { id, quantity, product } = item;

  return (
    <S.Layout>
      <S.Header>
        <CheckButton isChecked={true} />
        <S.DeleteButton className="DeleteButton">삭제</S.DeleteButton>
      </S.Header>
      <S.Body>
        <S.ItemImage src={product.imageUrl} />
        <S.ItemContainer>
          <S.ItemInfoContainer>
            <S.ItemNameText>{product.name}</S.ItemNameText>
            <S.ItemPriceText>{product.price}원</S.ItemPriceText>
          </S.ItemInfoContainer>
          <S.ItemQuantityContainer>
            <S.QuantityButton className="MinusButton">
              <img src={MinusIcon}></img>
            </S.QuantityButton>
            <p>{quantity}</p>
            <S.QuantityButton className="PlusButton">
              <img src={PlusIcon}></img>
            </S.QuantityButton>
          </S.ItemQuantityContainer>
        </S.ItemContainer>
      </S.Body>
    </S.Layout>
  );
}

export default CartItem;
