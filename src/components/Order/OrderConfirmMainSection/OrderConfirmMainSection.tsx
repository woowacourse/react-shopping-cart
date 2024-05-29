import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  additionalDeliveryText,
  additionalDeliveryWrapper,
  container,
  couponButton,
} from './OrderConfirmMainSection.styled';
import HeaderTitleContainer from '../../common/HeaderTitleContainer/HeaderTitleContainer';
import CouponModal from '../../Coupon/CouponModal/CouponModal';
import OrderItem from '../OrderItem';

import Checkbox from '@/components/common/Checkbox/Checkbox';
import PriceSection from '@/components/common/PriceSection/PriceSection';
import useModal from '@/hooks/useModal';
import { isAdditionalShippingState } from '@/recoil/coupons/atoms';
import { fetchCouponSelector } from '@/recoil/coupons/fetchCouponSelector';
import {
  checkedCartItemsState,
  orderResultState,
  productTypesCountState,
} from '@recoil/cartItems/selectors';

const OrderConfirmMainSection = () => {
  const couponList = useRecoilValue(fetchCouponSelector);
  const { totalQuantity } = useRecoilValue(orderResultState);
  const productTypesCount = useRecoilValue(productTypesCountState);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const [isAdditionalShipping, setIsAdditionalShipping] = useRecoilState(isAdditionalShippingState);

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const handleClickAdditionalShipping = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAdditionalShipping(e.target.checked);
  };

  return (
    <div css={container}>
      <HeaderTitleContainer
        title="주문 확인"
        description={`총 ${productTypesCount}종류의 상품 ${totalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해주세요.`}
      />
      <div>
        {checkedCartItems.map((checkedCartItem) => (
          <OrderItem key={checkedCartItem.id} item={checkedCartItem} />
        ))}
      </div>
      <button css={couponButton} onClick={handleOpenModal}>
        쿠폰 적용
      </button>
      <div css={additionalDeliveryWrapper}>
        <span css={additionalDeliveryText}>배송 정보</span>
        <Checkbox
          checked={isAdditionalShipping}
          onChange={handleClickAdditionalShipping}
          htmlFor="additional-delivery"
          label="제주도 및 도서 산간 지역 (+3000원)"
        />
      </div>
      <PriceSection type="ORDER" />
      {isOpen && <CouponModal isOpen={isOpen} onClose={handleCloseModal} couponList={couponList} />}
    </div>
  );
};

export default OrderConfirmMainSection;
