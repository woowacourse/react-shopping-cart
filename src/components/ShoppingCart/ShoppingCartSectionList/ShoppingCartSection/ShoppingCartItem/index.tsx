import { VFC } from 'react';
import { Product } from '../../../../../types';
import Card from '../../../../shared/Card';
import Checkbox from '../../../../shared/Checkbox';
import Container from '../../../../shared/Container';
import IconButton from '../../../../shared/IconButton';
import NumberInput from '../../../../shared/NumberInput';
import Text from '../../../../shared/Text';
import { ProductName, ShoppingCartItemContainer } from './style';

interface Props {
  product: Product;
  className?: string;
}

const ShoppingCartItem: VFC<Props> = ({ product: { imgSrc, name, price }, className }) => (
  <ShoppingCartItemContainer className={className}>
    <Checkbox />
    <Card type="horizontal" imgSrc={imgSrc} height="9.125rem" width="100%">
      <ProductName>{name}</ProductName>
    </Card>
    <Container>
      <IconButton
        imgSrc={process.env.PUBLIC_URL + '/icons/trash-bin.svg'}
        width="1.5rem"
        height="1.5rem"
      />
      <NumberInput
        value={1}
        setValue={(value: number) => {
          let hi = value;
        }}
      />
      <Text>{price} 원</Text>
    </Container>
  </ShoppingCartItemContainer>
);

export default ShoppingCartItem;
