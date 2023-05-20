import Flex from '../../common/Flex';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './CartItem.styles';

const mock = {
  id: 1,
  name: 'Lavender Shampoo Bar',
  price: 12000,
  imageUrl:
    'https://cdn.shopify.com/s/files/1/2806/9936/products/suds-co-sunkissed-shampoo-bar-zero-waste-shampoo-3oz-12-scents-30710433415279.jpg?v=1678125583&width=900',
};
const CartItem = () => {
  return (
    <S.Root>
      <Flex width="100%" height="100%">
        <S.Checkbox type="checkbox" />
        <Flex width="100%" align="center">
          <S.Thumbnail alt={mock.name} src={mock.imageUrl} />
          <S.Name>{mock.name}</S.Name>
          <S.Info>
            <Flex dir="column" justify="space-between" align="end">
              <S.DeleteButton>X</S.DeleteButton>
              <QuantityStepper />
              <S.Price>{mock.price.toLocaleString()} 원</S.Price>
            </Flex>
          </S.Info>
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default CartItem;
