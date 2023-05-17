import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '@recoil/myCartState';

import {
  StyledCartListSection,
  StyledCartListTextBox,
  StyledCartListFlexBox,
} from '@pages/CartListSection/CartListSection.styled';
import * as Text from '@commons/Text/Text';
import CardList from '@pages/CartListSection/CartList/CartList';
import { Checkbox } from '@components/commons/Checkbox/Checkbox';
import { Button as DeleteButton } from '@components/commons/Button/Button';

const CartListSection = () => {
  const cartItemLength = useRecoilValue(cartLengthSelector);

  return (
    <StyledCartListSection>
      <StyledCartListTextBox>
        <Text.Paragraph>든든배송 상품 ({cartItemLength}개)</Text.Paragraph>
      </StyledCartListTextBox>
      <CardList />
      <StyledCartListFlexBox>
        <Checkbox />
        <Text.Description>전체선택 (/{cartItemLength})</Text.Description>
        <DeleteButton
          width="100px"
          height="36px"
          padding="4px"
          border="1px solid #BBBBBB"
          border-radius="0px"
        >
          선택삭제
        </DeleteButton>
      </StyledCartListFlexBox>
    </StyledCartListSection>
  );
};

export default CartListSection;
