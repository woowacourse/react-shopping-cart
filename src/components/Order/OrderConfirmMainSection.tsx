import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import HeaderTitleContainer from '../common/HeaderTitleContainer';
import CouponModal from '../Coupon/CouponModal';

import OrderInfo from '@/components/common/OrderInfo';
import CartItem from '@common/CartItem';
import Checkbox from '@common/Checkbox';
import { THEME } from '@constants/theme';
import {
  checkedCartItemsState,
  orderResultState,
  productTypesCountState,
} from '@recoil/cartItems/selectors';

const OrderConfirmMainSection = () => {
  const { totalQuantity } = useRecoilValue(orderResultState);
  const productTypesCount = useRecoilValue(productTypesCountState);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);

  const [isAdditionalDelivery, setIsAdditionalDelivery] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAdditionalDelivery = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAdditionalDelivery(e.target.checked);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div css={container}>
      <HeaderTitleContainer
        title="주문 확인"
        description={`총 ${productTypesCount}종류의 상품 ${totalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
      />
      <div>
        {checkedCartItems.map((checkedCartItem) => (
          <CartItem key={checkedCartItem.id} item={checkedCartItem} type="ORDER" />
        ))}
      </div>
      {/* TODO: 쿠폰 할인 적용 값 recoil로 관리 */}
      <button css={couponButton} onClick={handleOpenModal}>
        쿠폰 적용
      </button>
      <div css={additionalDeliveryWrapper}>
        <span css={additionalDeliveryText}>배송 정보</span>
        <Checkbox
          checked={isAdditionalDelivery}
          onChange={handleClickAdditionalDelivery}
          htmlFor="additional-delivery"
          label="제주도 및 도서 산간 지역"
        />
      </div>
      <OrderInfo type="ORDER" />
      <CouponModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default OrderConfirmMainSection;

const container = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;

  padding: 0 24px;

  overflow-y: scroll;
`;

const additionalDeliveryWrapper = css`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  gap: 12px;
`;

const additionalDeliveryText = css`
  font-weight: 700;
  font-size: 16px;
`;

const couponButton = css`
  border: 1px solid #33333340;
  border-radius: 10px;
  padding: 16px 0;

  background-color: ${THEME.WHITE};

  font-weight: 700;
  font-size: 15px;
  color: #333333bf;
`;
