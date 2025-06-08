import styled from '@emotion/styled';
import BottomButton from '../components/BottomButton';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, URL_LOCATION } from '../constants/url';
import OrderPageMessage from '../components/OrderPageMessage';
import DeliverySection from '../components/DeliverySection';
import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import PriceSection from '../components/priceSection/PriceSection';
import ItemInfoCard from '../components/ItemInfoCard';
import CouponModal from '../components/Modal/CouponModal';
import { useState } from 'react';
import { getCheckedItems } from '../utils';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import useOrderPage from '../hooks/useOrderPage';

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const { deliveryChecked, handleClickDeliveryCheckbox, orderPrice, deliveryPrice, discountPrice } =
    useOrderPage();

  const checkedSet = new Set(checkedCartIds);
  const totalQuantity = cartItems.reduce(
    (acc, item) => (checkedSet.has(item.id) ? acc + item.quantity : acc),
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <S.content data-testid="orderPage">
        <CouponModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        <S.title>주문 확인</S.title>
        <>
          <OrderPageMessage cartLength={checkedCartIds.length} totalQuantity={totalQuantity} />
          <S.itemCardList>
            {getCheckedItems(cartItems, checkedCartIds).map((item) => (
              <ItemInfoCard key={item.id} product={item.product} quantity={item.quantity} />
            ))}
          </S.itemCardList>
          <S.CouponButton onClick={() => setIsModalOpen(true)}>쿠폰 적용</S.CouponButton>
          <DeliverySection
            deliveryChecked={deliveryChecked}
            handleClickDeliveryCheckbox={handleClickDeliveryCheckbox}
          />
          <S.infoContainer>
            <img src="./info.svg" />
            <p>
              총 주문 금액이 {DELIVERY_PRICE_THRESHOLD.toLocaleString()}원 이상인 경우 무료
              배송됩니다.
            </p>
          </S.infoContainer>
          <PriceSection
            orderPrice={orderPrice}
            discountPrice={discountPrice}
            deliveryPrice={deliveryPrice}
          />
        </>
      </S.content>
      <BottomButton
        title="결제하기"
        onClick={() =>
          navigate(BASE_URL + URL_LOCATION.CONFIRM, {
            state: {
              cartItems,
              checkedCartIds,
              totalPrice: orderPrice + deliveryPrice - discountPrice,
            },
          })
        }
      />
    </>
  );
};

export default OrderPage;

const S = {
  title: styled.p`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  `,

  content: styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 64px);
  `,

  itemCardList: styled.ul`
    overflow-y: auto;
  `,

  CouponButton: styled.button`
    padding: 8px;
    border-radius: 5px;
    border: 1px solid rgba(51, 51, 51, 0.25);
    color: rgba(51, 51, 51, 0.75);
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  `,

  infoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 0px;
    border-bottom: 2px solid #e6e6e6;
  `,
};
