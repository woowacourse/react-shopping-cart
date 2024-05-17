import { useRecoilState } from 'recoil';
import CheckButton from '../Button/CheckButton/CheckButton';
import QuantityContainer from '../Container/QuantityContainer/QuantityContainer';
import type { TCartItem } from '../../types/CartItem.type';
import { selectedCartItemListSelector } from '../../recoil/selectors/selectors';

import * as S from './CartItem.style';

interface CartItemProps {
  item: TCartItem;
  onRemoveItem: (cartItemId: number) => void;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
}

function CartItem({ item, onRemoveItem, onUpdateQuantity }: CartItemProps) {
  const { id, quantity, product } = item;

  const [isSelected, setIsSelected] = useRecoilState(selectedCartItemListSelector(item));

  const handleIsSelected = () => setIsSelected(isSelected);

  return (
    <S.Layout>
      <S.Header>
        <CheckButton isChecked={isSelected} onClick={handleIsSelected} />
        <S.DeleteButton onClick={() => onRemoveItem(id)}>삭제</S.DeleteButton>
      </S.Header>
      <S.Body>
        <S.ItemImage src={product.imageUrl} />
        <S.ItemContainer>
          <S.ItemInfoContainer>
            <S.ItemNameText>{product.name}</S.ItemNameText>
            <S.ItemPriceText>{product.price.toLocaleString()}원</S.ItemPriceText>
          </S.ItemInfoContainer>
          <QuantityContainer
            quantity={quantity}
            onMinusButtonClick={() => onUpdateQuantity(id, quantity - 1)}
            onPlusButtonClick={() => onUpdateQuantity(id, quantity + 1)}
          />
        </S.ItemContainer>
      </S.Body>
    </S.Layout>
  );
}

export default CartItem;
