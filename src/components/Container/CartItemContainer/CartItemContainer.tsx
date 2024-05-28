import { useSelectedCartItemList } from '../../../hooks/useIsSelectedCartItem';
import CheckButton from '../../Button/CheckButton/CheckButton';
import QuantityContainer from '../QuantityContainer/QuantityContainer';
import * as S from './CartItemContainer.style';

import type { CartItem } from '../../../types/CartItem';
interface CartItemProps {
  item: CartItem;
  onRemoveItem?: (cartItemId: number) => void;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => void;
}

function CartItemContainer({ item, onRemoveItem, onUpdateQuantity }: CartItemProps) {
  const { id, quantity, product } = item;
  const { isSelected, toggleSelection } = useSelectedCartItemList();
  // const [isSelected, setIsSelected] = useRecoilState(selectedCartItemListSelector(item));

  const handleIsSelected = () => {
    toggleSelection(item);
  };

  const renderQuantityContainer = () => {
    return onUpdateQuantity ? (
      <QuantityContainer
        quantity={quantity.toString()}
        onMinusButtonClick={() => onUpdateQuantity(id, quantity - 1)}
        onPlusButtonClick={() => onUpdateQuantity(id, quantity + 1)}
      />
    ) : (
      <QuantityContainer quantity={`${quantity}개`}></QuantityContainer>
    );
  };

  return (
    <S.Layout>
      <S.Header>
        {onRemoveItem && <CheckButton isChecked={isSelected(item)} onClick={handleIsSelected} />}
        {onRemoveItem && (
          <S.DeleteButton className="DeleteButton" onClick={() => onRemoveItem(id)}>
            삭제
          </S.DeleteButton>
        )}
      </S.Header>
      <S.Body>
        <S.ItemImage src={product.imageUrl} />
        <S.ItemContainer>
          <S.ItemInfoContainer>
            <S.ItemNameText>{product.name}</S.ItemNameText>
            <S.ItemPriceText>{product.price.toLocaleString()}원</S.ItemPriceText>
          </S.ItemInfoContainer>
          {renderQuantityContainer()}
        </S.ItemContainer>
      </S.Body>
    </S.Layout>
  );
}

export default CartItemContainer;
