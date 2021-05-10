import { VFC } from 'react';
import { ItemInCart } from '../../../../../types';
import Card from '../../../../shared/Card';
import Checkbox from '../../../../shared/Checkbox';
import Container from '../../../../shared/Container';
import IconButton from '../../../../shared/IconButton';
import NumberInput from '../../../../shared/NumberInput';
import Text from '../../../../shared/Text';
import { ProductName, ShoppingCartItemCard, ShoppingCartItemContainer } from './style';

interface Props {
  item: ItemInCart;
  changeQuantity: (item: ItemInCart, value: number) => void;
  className?: string;
}

const ShoppingCartItem: VFC<Props> = ({ item, changeQuantity, className }) => {
  const { image, name, quantity, price } = item;

  return (
    <ShoppingCartItemContainer className={className}>
      <Checkbox />
      <ShoppingCartItemCard type="horizontal" image={image}>
        <ProductName>{name}</ProductName>
      </ShoppingCartItemCard>
      <Container>
        <IconButton
          image={process.env.PUBLIC_URL + '/icons/trash-bin.svg'}
          width="1.5rem"
          height="1.5rem"
        />
        <NumberInput value={quantity} min={1} setValue={(value) => changeQuantity(item, value)} />
        <Text>{price * quantity} 원</Text>
      </Container>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
