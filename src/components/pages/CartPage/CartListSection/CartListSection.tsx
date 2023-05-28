import { useRecoilState, useRecoilValue } from 'recoil';

import {
  cartItemsLengthSelector,
  checkedCartItemsLengthSelector,
} from '@recoil/selector';
import { useDeleteSelectedItems } from './useDeleteSelectedItems';

import {
  StyledCartListSection,
  StyledCartListTextBox,
  StyledCartListFlexBox,
} from '@components/pages/CartPage/CartListSection/CartListSection.styled';
import * as Text from '@commons/Text/Text';
import CardList from '@components/pages/CartPage/CartListSection/CartList/CartList';
import { Checkbox as EntireCheckbox } from '@components/commons/Checkbox/Checkbox';
import { Button as CheckedItemsDeleteButton } from '@components/commons/Button/Button';
import { cartItemsState } from '@recoil/atom';

const CartListSection = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const cartItemLength = useRecoilValue(cartItemsLengthSelector);
  const checkedCartItemsLength = useRecoilValue(checkedCartItemsLengthSelector);
  const deleteSelectedItems = useDeleteSelectedItems();

  const handleEntireCheck = () => {
    setCartItems(prev => {
      return Object.fromEntries(
        Object.entries(prev).map(cartItem => {
          return [
            cartItem[0],
            {
              ...cartItem[1],
              isChecked: true,
            },
          ];
        })
      );
    });
  };

  const handleEntireUnCheck = () => {
    setCartItems(prev => {
      return Object.fromEntries(
        Object.entries(prev).map(cartItem => {
          return [
            cartItem[0],
            {
              ...cartItem[1],
              isChecked: false,
            },
          ];
        })
      );
    });
  };

  const generateInitIsChecked = () => {
    const cartItemList = Object.values(cartItems);

    if (!cartItemList.length) return false;

    return cartItemList.every(cartItem => cartItem.isChecked);
  };

  return (
    <StyledCartListSection>
      <StyledCartListTextBox>
        <Text.Paragraph>든든배송 상품 ({cartItemLength}개)</Text.Paragraph>
      </StyledCartListTextBox>
      <CardList />
      <StyledCartListFlexBox>
        <EntireCheckbox
          initIsChecked={generateInitIsChecked()}
          handleCheck={handleEntireCheck}
          handleUnCheck={handleEntireUnCheck}
        />
        <Text.Description>
          전체선택 ({checkedCartItemsLength}/{cartItemLength})
        </Text.Description>
        <CheckedItemsDeleteButton
          width="100px"
          height="36px"
          padding="4px"
          border="1px solid #BBBBBB"
          border-radius="0px"
          onClick={() => deleteSelectedItems(cartItems)}
        >
          선택삭제
        </CheckedItemsDeleteButton>
      </StyledCartListFlexBox>
    </StyledCartListSection>
  );
};

export default CartListSection;
