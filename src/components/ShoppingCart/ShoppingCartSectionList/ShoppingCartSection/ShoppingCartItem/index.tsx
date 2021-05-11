import { VFC } from 'react';
import { ItemInCart } from '../../../../../types';
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
    <ShoppingCartItemContainer className={className}>
      <Checkbox checked={checked} onChange={() => changeChecked(item)} />
      <ShoppingCartItemCard type="horizontal" image={image}>
        <ProductName>{name}</ProductName>
      </ShoppingCartItemCard>
      <Container>
        <IconButton
          image={process.env.PUBLIC_URL + '/icons/trash-bin.svg'}
          width="1.5rem"
          height="1.5rem"
          onClick={() => deleteItem(id)}
        />
        <NumberInput value={quantity} min={1} setValue={(value) => changeQuantity(item, value)} />
        <Text>{price * quantity} 원</Text>
      </Container>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
