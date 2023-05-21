import { useRecoilValue } from 'recoil';
import {
  cartItemsAmountSelector,
  selectedItemsAmountSelector,
} from '../../../atoms/cart';
import useCartSelector from '../../../hooks/cart/useCartSelector';
import { Button } from '../../common/Button/Button.styles';
import Flex from '../../common/Flex';
import * as S from './CartItemController.styles';

const CartItemController = () => {
  const { handleSelectDeselectAll } = useCartSelector();
  const selectedItemsAmount = useRecoilValue(selectedItemsAmountSelector);
  const cartItemsAmount = useRecoilValue(cartItemsAmountSelector);

  return (
    <S.Root>
      <Flex align="center">
        <S.Checkbox
          type="checkbox"
          checked={selectedItemsAmount === cartItemsAmount}
          onChange={handleSelectDeselectAll}
        />
        <S.Text>
          전체선택 ({selectedItemsAmount}/{cartItemsAmount})
        </S.Text>
        <Button view="white" size="M">
          선택삭제
        </Button>
      </Flex>
    </S.Root>
  );
};

export default CartItemController;
