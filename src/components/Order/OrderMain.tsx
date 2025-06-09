import styled from '@emotion/styled';
import { infoIcon } from '../../assets';
import OrderList from './OrderList';
import ShippingInfo from './ShippingInfo';
import CouponModal from '../Modal/CouponModal';
import { useOrder } from '../../context/OrderContext';
import OrderFooter from './OrderFooter';

function OrderMain() {
  const { isOpenModal, toggleModal } = useOrder();

  return (
    <>
      <OrderList />
      <CouponButton onClick={toggleModal}>쿠폰 적용</CouponButton>
      <ShippingInfo />
      <CartInfo>
        <InfoIconImage src={infoIcon} alt="infoIcon" />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </CartInfo>
      <OrderFooter />
      {isOpenModal && <CouponModal />}
    </>
  );
}

export default OrderMain;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 13px;
`;

const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;

const CouponButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 5px;
  border: 1px solid rgba(51, 51, 51, 0.25);
  background-color: transparent;
  cursor: pointer;
`;
