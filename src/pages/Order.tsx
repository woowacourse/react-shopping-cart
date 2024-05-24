import { StyledFixedBottom, StyledFixedTop } from '@/style/styledBox.style';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CartRecipe from '@/components/Cart/CartRecipe';
import CouponModal from '@/components/Coupon/CouponModal';
import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header';
import OrderList from '@/components/Order/OrderList';
import OrderTitle from '@/components/Order/OrderTitle';
import { ROUTE_PATH } from '@/constants/routePath';
import ShippingInfo from '@/components/Order/ShippingInfo';
import { WhiteSpace } from '@/style/common.style';
import WideButton from '@/components/Button/WideButton';
import { orderItemState } from '@/store/selectors/orderItemSelector';
import { postOrders } from '@/api/order';
import { selectedCouponListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const orderList = useRecoilValue(orderItemState);

  const setSelectedCoupon = useSetRecoilState(selectedCouponListState);
  useEffect(() => {
    setSelectedCoupon([]);
  }, [setSelectedCoupon]);

  const handleClickOrder = () => {
    const postData = async () => {
      await postOrders(orderList.map((order) => order.id));
    };

    postData();
    navigate(ROUTE_PATH.orderConfirm);
  };

  return (
    <>
      <StyledFixedTop>
        <Header type="ArrowBack" navigatePath={ROUTE_PATH.cart} />
      </StyledFixedTop>
      <StyledScrollBox>
        <OrderTitle />
        <OrderList />
      </StyledScrollBox>
      <StyledFixedBottom>
        <StyledFlexCenter>
          <WideButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            color="white"
          >
            쿠폰 적용
          </WideButton>
        </StyledFlexCenter>
        <ShippingInfo />
        <CartRecipe isCoupon={true} />
        <FullWidthButton onClick={handleClickOrder}>결제하기</FullWidthButton>
      </StyledFixedBottom>
      {isOpen && (
        <CouponModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Order;

const StyledFlexCenter = styled.div`
  display: flex;
  justify-content: center;
  ${WhiteSpace}
`;

export const StyledScrollBox = styled.div`
  margin-top: 64px;
  overflow-y: scroll;
  height: calc(100vh - 500px);
  width: 430px;
`;
