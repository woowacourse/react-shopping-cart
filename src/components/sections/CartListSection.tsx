import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import CartList from '../list/CartList';
import PriceBox from '../box/PriceBox';
import { Text } from '../common/Text/Text';
import ErrorBox from '../common/ErrorBox/ErrorBox';
import { cartListState } from '../../recoil/atom';
import type { CartItem } from '../../types/types';

const CartListSection = () => {
  const cartList = useRecoilValue(cartListState);

  const [checkedCartItemList, setCheckedCartItemList] = useState<CartItem[]>(cartList);

  if (cartList.length === 0) return <ErrorBox errorType="emptyList" />;

  return (
    <>
      <Text size="large">장바구니</Text>
      <CartListSectionWrapper>
        <CartList
          checkedCartItemList={checkedCartItemList}
          setCheckedCartItemList={setCheckedCartItemList}
        />
        <PriceBox checkedCartItemList={checkedCartItemList} />
      </CartListSectionWrapper>
    </>
  );
};

export default CartListSection;

const CartListSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 70%;
  margin-top: 25px;
  padding: 0 6px;
  border-top: 3px solid #000000;
`;
