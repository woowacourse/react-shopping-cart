import { ChangeEvent } from 'react';
import useCartSelector from '../../../hooks/cart/useCartSelector';
import { CartItem as CartItemType } from '../../../types/cart';
import Flex from '../../common/Flex';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './CartItem.styles';

type CartItemProps = CartItemType;

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    id,
    quantity,
    product: { imageUrl, name, price },
  } = props;
  const { selectedItems, selectItem } = useCartSelector();

  return (
    <S.Root>
      <Flex width="100%" height="100%">
        <S.Checkbox
          type="checkbox"
          checked={selectedItems.has(id)}
          onChange={() => selectItem(id)}
        />
        <Flex width="100%" align="center">
          <S.Thumbnail alt={name} src={imageUrl} />
          <S.Name>{name}</S.Name>
          <S.Info>
            <Flex dir="column" justify="space-between" align="end">
              <S.DeleteButton>X</S.DeleteButton>
              <QuantityStepper init={quantity} />
              <S.Price>{price.toLocaleString()} 원</S.Price>
            </Flex>
          </S.Info>
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default CartItem;
