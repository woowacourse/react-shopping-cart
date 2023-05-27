import { useRecoilValue } from 'recoil';

import { checkedCartItemsState } from '@recoil/atom';
import { cartItemsLengthSelector } from '@recoil/selector';
import { useDeleteSelectedItems } from './useDeleteSelectedItems';

import {
  StyledCartListSection,
  StyledCartListTextBox,
  StyledCartListFlexBox,
} from '@components/pages/CartPage/CartListSection/CartListSection.styled';
import * as Text from '@commons/Text/Text';
import CardList from '@components/pages/CartPage/CartListSection/CartList/CartList';
import { Checkbox as WholeCheckbox } from '@components/commons/Checkbox/Checkbox';
import { Button as CheckedItemsDeleteButton } from '@components/commons/Button/Button';

const CartListSection = () => {
  const cartItemLength = useRecoilValue(cartItemsLengthSelector);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const deleteSelectedItems = useDeleteSelectedItems(checkedCartItems);

  return (
    <StyledCartListSection>
      <StyledCartListTextBox>
        <Text.Paragraph>든든배송 상품 ({cartItemLength}개)</Text.Paragraph>
      </StyledCartListTextBox>
      <CardList />
      <StyledCartListFlexBox>
        <WholeCheckbox />
        <Text.Description>
          전체선택 ({Object.keys(checkedCartItems).length}/{cartItemLength})
        </Text.Description>
        <CheckedItemsDeleteButton
          width="100px"
          height="36px"
          padding="4px"
          border="1px solid #BBBBBB"
          border-radius="0px"
          onClick={() => deleteSelectedItems()}
        >
          선택삭제
        </CheckedItemsDeleteButton>
      </StyledCartListFlexBox>
    </StyledCartListSection>
  );
};

export default CartListSection;
