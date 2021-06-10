import { VFC } from 'react';
import { CartId, CartItem } from '../../../../../types';
import { KRCurrency } from '../../../../../utils/format';
import Checkbox from '../../../../shared/Checkbox';
import Container from '../../../../shared/Container';
import NumberInput from '../../../../shared/NumberInput';
import Text from '../../../../shared/Text';
import {
  DeleteButton,
  ProductName,
  ShoppingCartItemCard,
  ShoppingCartItemContainer,
} from './style';

interface Props {
  item: CartItem;
  changeQuantity: (item: CartItem, value: number) => void;
  deleteItem: (cartId: CartId) => void;
  changeChecked: (cartId: CartId) => void;
  className?: string;
}

const ShoppingCartItem: VFC<Props> = ({
  item,
  changeQuantity,
  deleteItem,
  changeChecked,
  className,
}) => {
  const { imageUrl, name, price, cartId, checked, quantity } = item;

  return (
    <ShoppingCartItemContainer
      className={className}
      data-testid="cart-item"
      data-test-item-id={item.cartId}
    >
      <Checkbox
        checked={checked}
        onChange={() => changeChecked(item.cartId)}
        description="상품선택"
        labelTextHidden
        data-testid="select-checkbox"
      />
      <ShoppingCartItemCard type="horizontal" image={imageUrl}>
        <ProductName>{name}</ProductName>
      </ShoppingCartItemCard>
      <Container>
        <DeleteButton
          type="button"
          onClick={() => deleteItem(cartId)}
          data-testid="delete-button"
        />
        <NumberInput value={quantity} min={1} setValue={(value) => changeQuantity(item, value)} />
        <Text>{KRCurrency(price * quantity)}</Text>
      </Container>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
