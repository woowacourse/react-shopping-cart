import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { cartItemsState, checkedCartItemsState } from '@recoil/atom';
import { cartItemsLengthSelector } from '@recoil/selector';
import useFetch from '@hooks/useFetch';

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
  const [checkedCartItems, setCheckedCartItems] = useRecoilState(
    checkedCartItemsState
  );
  const { deleteData } = useFetch('/cart-items');
  const setCartItems = useSetRecoilState(cartItemsState);
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const handleCheckedItemsDeleteButtonClick = () => {
    const productIds = Object.values(checkedCartItems);
    const urls = productIds.map(productId => `/${productId}`);

    productIds.forEach((productId: number, index) => {
      deleteData(urls[index]);
      setCartItems(prev => {
        const newCartItems = { ...prev };
        const key = `product${productId}`;
        delete newCartItems[key];

        return newCartItems;
      });
    });

    setIsDeleteItem(() => true);

    setCheckedCartItems(prev => {
      const newCheckedCartItems = {
        ...prev,
      };

      productIds.forEach(productId => {
        delete newCheckedCartItems[`productId${productId}`];
      });

      return newCheckedCartItems;
    });
  };

  useEffect(() => {
    if (isDeleteItem) setIsDeleteItem(false);
  }, [isDeleteItem]);

  return (
    <StyledCartListSection>
      <StyledCartListTextBox>
        <Text.Paragraph>든든배송 상품 ({cartItemLength}개)</Text.Paragraph>
      </StyledCartListTextBox>
      <CardList isDeleteItem={isDeleteItem} setIsDeleteItem={setIsDeleteItem} />
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
          onClick={() => handleCheckedItemsDeleteButtonClick()}
        >
          선택삭제
        </CheckedItemsDeleteButton>
      </StyledCartListFlexBox>
    </StyledCartListSection>
  );
};

export default CartListSection;
