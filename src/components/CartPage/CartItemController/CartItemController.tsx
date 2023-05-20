import { Button } from '../../common/Button/Button.styles';
import Flex from '../../common/Flex';
import * as S from './CartItemController.styles';

const CartItemController = () => {
  return (
    <S.Root>
      <Flex align="center">
        <S.Checkbox type="checkbox" />
        <S.Text>전체선택 (2/3)</S.Text>
        <Button view="white" size="M">
          선택삭제
        </Button>
      </Flex>
    </S.Root>
  );
};

export default CartItemController;
