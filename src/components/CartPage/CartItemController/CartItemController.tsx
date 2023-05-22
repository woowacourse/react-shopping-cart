import {
  cartItemsAmountSelector,
  selectedItemsAmountSelector,
} from '../../../atoms/cart';
import { useCartSelector, useMutateCart } from '../../../hooks/cart/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import Button from '../../common/Button/Button';

import Flex from '../../common/Flex';
import * as S from './CartItemController.styles';

const CartItemController = () => {
  const { handleSelectDeselectAll } = useCartSelector();
  const { deleteSelectedCartItems } = useMutateCart();
  const cartItemsAmount = useRefreshableRecoilValue(cartItemsAmountSelector);
  const selectedItemsAmount = useRefreshableRecoilValue(
    selectedItemsAmountSelector
  );

  return (
    <S.Root>
      <Flex align="center">
        <S.Checkbox
          type="checkbox"
          checked={selectedItemsAmount === cartItemsAmount}
          onChange={handleSelectDeselectAll}
          disabled={!cartItemsAmount}
        />
        <S.Text>
          전체선택 ({selectedItemsAmount}/{cartItemsAmount})
        </S.Text>
        <Button size="M" view="white" onClick={deleteSelectedCartItems}>
          선택삭제
        </Button>
      </Flex>
    </S.Root>
  );
};

export default CartItemController;
