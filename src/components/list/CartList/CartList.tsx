/* eslint-disable @typescript-eslint/no-empty-function */
import styled from '@emotion/styled';
import CartItem from '../../box/CartItem/CartItem';
import CheckBox from '../../common/CheckBox/CheckBox';
import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text';
import { useEffect, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { useCart } from '../../../hooks/useCart';
import { useRecoilState } from 'recoil';
import { checkCartListState } from '../../../service/atom';

const CartList = () => {
  const { data, deleteCartItemAPI } = useCart();

  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);
  const [isAllCheck, setIsAllCheck] = useState(true);

  const { openModal } = useModal();

  const deleteSelectCart = async () => {
    checkCartList.forEach((cartId) => {
      deleteCartItemAPI(cartId);
    });
    setCheckCartList([]);
  };

  const onClickCheckBox = () => {
    if (isAllCheck) {
      setCheckCartList([]);
      setIsAllCheck(false);
      return;
    }
    data && setCheckCartList(data.map((cart) => cart.id));
    setIsAllCheck(true);
  };

  useEffect(() => {
    if (data && data.length === checkCartList.length) {
      setIsAllCheck(true);
      return;
    }
    setIsAllCheck(false);
  }, [checkCartList]);

  return (
    <CartListWrapper>
      <CartListHead>
        <Text size="small" weight="light">
          든든배송 상품 ({data?.length}개)
        </Text>
      </CartListHead>
      <Cart>
        {data?.map((cart) => (
          <CartItem key={cart.product.id} cart={cart} />
        ))}
      </Cart>
      <CartListFoot>
        <CheckBox
          label={`전체선택(${checkCartList.length})`}
          checked={isAllCheck}
          onClick={onClickCheckBox}
        />
        <Button
          size="small"
          text="선택삭제"
          onClick={() => openModal({ callback: deleteSelectCart })}
        />
      </CartListFoot>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CartListHead = styled.div`
  width: 100%;
  border-bottom: 3px solid #aaa;
  padding: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Cart = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CartListFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;
