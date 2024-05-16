import { useRecoilState } from 'recoil';
import { selectedCartItemListSelector } from '../../recoil/selectors/selectors';
import CheckButton from '../Button/CheckButton/CheckButton';
import type { TCartItem } from '../../types/CartItem.type';
import { PlusIcon, MinusIcon } from '../../assets';

import * as S from './CartItem.style';

interface CardItemProps {
  item: TCartItem;
  onRemoveItem: (cartItemId: number) => void;
  onUpdateQuantity: (cardItemId: number, quantity: number) => void;
}

function CartItem({ item, onRemoveItem, onUpdateQuantity }: CardItemProps) {
  const { id, quantity, product } = item;

  const [isSelected, setIsSelected] = useRecoilState(selectedCartItemListSelector(item));

  const handleIsSelected = () => setIsSelected(isSelected);

  return (
    <S.Layout>
      <S.Header>
        <CheckButton isChecked={isSelected} onClick={handleIsSelected} />
        <S.DeleteButton className="DeleteButton" onClick={() => onRemoveItem(id)}>
          삭제
        </S.DeleteButton>
      </S.Header>
      <S.Body>
        <S.ItemImage src={product.imageUrl} />
        <S.ItemContainer>
          <S.ItemInfoContainer>
            <S.ItemNameText>{product.name}</S.ItemNameText>
            <S.ItemPriceText>{product.price.toLocaleString()}원</S.ItemPriceText>
          </S.ItemInfoContainer>
          <S.ItemQuantityContainer>
            <S.QuantityButton className="MinusButton" onClick={() => onUpdateQuantity(id, quantity - 1)}>
              <img src={MinusIcon}></img>
            </S.QuantityButton>
            <p>{quantity}</p>
            <S.QuantityButton className="PlusButton" onClick={() => onUpdateQuantity(id, quantity + 1)}>
              <img src={PlusIcon}></img>
            </S.QuantityButton>
          </S.ItemQuantityContainer>
        </S.ItemContainer>
      </S.Body>
    </S.Layout>
  );
}

export default CartItem;
