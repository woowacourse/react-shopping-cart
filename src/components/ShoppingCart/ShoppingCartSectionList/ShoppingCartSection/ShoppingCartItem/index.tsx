import { VFC } from 'react';
import { ItemInCart } from '../../../../../types';
import { KRCurrency } from '../../../../../utils/format';
import Checkbox from '../../../../shared/Checkbox';
import Container from '../../../../shared/Container';
import IconButton from '../../../../shared/IconButton';
import NumberInput from '../../../../shared/NumberInput';
import Text from '../../../../shared/Text';
import { ProductName, ShoppingCartItemCard, ShoppingCartItemContainer } from './style';

interface Props {
  item: ItemInCart;
  changeQuantity: (item: ItemInCart, value: number) => void;
  deleteItem: (itemId: string) => void;
  changeChecked: (item: ItemInCart) => void;
  className?: string;
}

const ShoppingCartItem: VFC<Props> = ({
  item,
  changeQuantity,
  deleteItem,
  changeChecked,
  className,
}) => {
  const { image, name, quantity, price, id, checked } = item;

  return (
    <ShoppingCartItemContainer
      className={className}
      data-testid="cart-item"
      data-test-item-id={item.id}
    >
      <Checkbox
        checked={checked}
        onChange={() => changeChecked(item)}
        description="상품선택"
        labelTextHidden
        data-testid="select-checkbox"
      />
      <ShoppingCartItemCard type="horizontal" image={image}>
        <ProductName>{name}</ProductName>
      </ShoppingCartItemCard>
      <Container>
        <IconButton
          image={process.env.PUBLIC_URL + '/icons/trash-bin.svg'}
          width="1.5rem"
          height="1.5rem"
          onClick={() => deleteItem(id)}
          data-testid="delete-button"
        />
        <NumberInput value={quantity} min={1} setValue={(value) => changeQuantity(item, value)} />
        <Text>{KRCurrency(price * quantity)}</Text>
      </Container>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
