import { ROUTER_URL } from '../../constants/constants';

import WideButton from '../WideButton/WideButton';
import OrderConfirmationInfo from '../OrderConfirmationInfo/OrderConfirmationInfo';
import OrderInformationList from '../OrderInformationList/OrderInformationList';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import FloatingButton from '../FloatingButton/FloatingButton';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import CouponModal from '../CouponModal/CouponModal';

import createOrder from '../../api/post/createOrder';
import { orderInfoStore } from '../../recoil/selectors';
import { selectedCartItems } from '../../recoil/atoms';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

const OrderInformationOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedItems = useRecoilValue(selectedCartItems);
  const selectItemsLength = useRecoilValue(selectedCartItems).length;
  const orderInfo = useRecoilValue(orderInfoStore);
  const navigate = useNavigate();

  const onOrderButtonClick = async () => {
    const orderItemIds = selectedItems.map(selectedItem => {
      return selectedItem.cartItemId;
    });

    await createOrder(orderItemIds);
    navigate(ROUTER_URL.PAYMENT_INFO, { state: orderInfo });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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
      <FloatingButton
        label={'결제하기'}
        onClick={onOrderButtonClick}
        disabled={selectItemsLength <= 0}
      />
    </>
  );
};

export default OrderInformationOverview;
