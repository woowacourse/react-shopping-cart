import WideButton from '../WideButton/WideButton';
import OrderConfirmationInfo from '../OrderConfirmationInfo/OrderConfirmationInfo';
import OrderInformationList from '../OrderInformationList/OrderInformationList';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import FloatingButton from '../FloatingButton/FloatingButton';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import CouponModal from '../CouponModal/CouponModal';

import { IOrderInfo } from '../../recoil/selectors';
import { selectedCartItems } from '../../recoil/atoms';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import * as S from './styled';

const OrderInformationOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedItems = useRecoilValue(selectedCartItems);
  const selectItemsLength = useRecoilValue(selectedCartItems).length;
  const location = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const orderInfo = location.state as IOrderInfo | null;

  return (
    <>
      <CouponModal isOpen={isModalOpen} toggleModal={toggleModal} />
      <S.OrderInformationOverviewContainer>
        <OrderConfirmationInfo orderInfo={orderInfo} />
        <OrderInformationList selectedItems={selectedItems} />
        <WideButton onClick={toggleModal}>쿠폰 적용</WideButton>
        <ShippingInfo />
        <PaymentTotal isUseDiscount={true} />
      </S.OrderInformationOverviewContainer>
      <FloatingButton label={'주문 확인'} disabled={selectItemsLength <= 0} />
    </>
  );
};

export default OrderInformationOverview;
