import { FC } from 'react';
import { ItemInCart } from '../../../../../types';
import { KRCurrency } from '../../../../../utils/format';
import Checkbox from '../../../../shared/Checkbox';
import Container from '../../../../shared/Container';
import NumberInput from '../../../../shared/NumberInput';
import Text from '../../../../shared/Text';
import { CONFIRM } from '../../../../../constants/message';
import {
  DeleteButton,
  ProductName,
  ShoppingCartItemCard,
  ShoppingCartItemContainer,
} from './style';
import { CART_ITEM_MIN_QUANTITY } from '../../../../../constants/cart';

interface Props {
  item: ItemInCart;
  changeQuantity: (item: ItemInCart, value: number) => void;
  deleteItem: (itemId: string) => void;
  toggleChecked: (item: ItemInCart) => void;
  className?: string;
}

const ShoppingCartItem: FC<Props> = ({
  item,
  changeQuantity,
  deleteItem,
  toggleChecked,
  className,
}) => {
  const { image_url, name, quantity, price, id, checked } = item;

  const onItemDelete = () => {
    if (!window.confirm(CONFIRM.DELETE_CART_ITEM)) return;

    deleteItem(id);
  };

  const setItemQuantity = (quantity: number) => {
    if (quantity < CART_ITEM_MIN_QUANTITY) return;

    changeQuantity(item, quantity);
  };

  return (
    <ShoppingCartItemContainer
      className={className}
      data-testid="cart-item"
      data-test-item-id={item.id}
    >
      <Checkbox
        checked={checked}
        onChange={() => toggleChecked(item)}
        description="상품선택"
        labelTextHidden
        data-testid="select-checkbox"
      />
      <ShoppingCartItemCard type="horizontal" image={image_url}>
        <ProductName>{name}</ProductName>
      </ShoppingCartItemCard>
      <Container>
        <DeleteButton onClick={onItemDelete} data-testid="delete-button" />
        <NumberInput value={quantity} setValue={setItemQuantity} min={1} />
        <Text>{KRCurrency(price * quantity)}</Text>
      </Container>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
