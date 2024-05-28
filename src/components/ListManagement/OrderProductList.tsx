import { useRecoilState, useRecoilValue } from 'recoil';
import {
  calculateOrderPrice,
  checkedCartItems,
  fetchCouponList,
  totalPaymentPrice,
} from '../../recoil/selectors';

import { Modal } from 'soha-components';

import CheckBox from '../CheckBox/CheckBox';
import OrderProductItem from '../ItemManagement/OrderProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';

import * as P from './ProductList.style';
import * as OP from './OrderProductList.style';
import { useState } from 'react';
import Coupon from '../Coupon/Coupon';

import useCoupon from '../../hooks/useCoupon';
import { discountPrice, isIslandState } from '../../recoil/atoms';

export default function OrderProductList() {
  const order = useRecoilValue(checkedCartItems);
  const { totalOrderPrice, deliveryFee } = useRecoilValue(calculateOrderPrice);
  const couponList = useRecoilValue(fetchCouponList);
  const finalDiscountPrice = useRecoilValue(discountPrice);
  const finalTotalPaymentPrice = useRecoilValue(totalPaymentPrice);

  const [isIsland, setIsland] = useRecoilState(isIslandState);

  const [openModal, setOpenModal] = useState(false);

  useCoupon();

  const priceList: PriceList = {
    0: ['주문 금액', totalOrderPrice],
    1: ['쿠폰 할인 금액', finalDiscountPrice],
    2: ['배송비', deliveryFee],
  };

  return (
    <P.ProductListStyle>
      {order.map((orderItem) => {
        return <OrderProductItem orderItem={orderItem} key={orderItem.id} />;
      })}
      <OP.CouponButton onClick={() => setOpenModal(true)}>
        쿠폰 적용
      </OP.CouponButton>
      <OP.DeliveryInfo>
        <span className="delivery-info_title">배송 정보</span>
        <div className="delivery-info_checkbox">
          <CheckBox
            onClick={() => {
              setIsland(!isIsland);
            }}
            isCheck={isIsland}
          />
          <span className="delivery-info_explanation">
            제주도 및 도서 산간 지역
          </span>
        </div>
      </OP.DeliveryInfo>
      <ProductTotalPriceList
        priceList={priceList}
        totalPrice={finalTotalPaymentPrice}
      />
      {openModal && (
        <Modal
          position="center"
          title="쿠폰을 선택해 주세요"
          closeButton="img"
          closeModalClick={() => setOpenModal(false)}
          buttonText={`총 ${finalDiscountPrice.toLocaleString('ko-kr')}원 할인 쿠폰 사용하기`}
          buttonClick={() => setOpenModal(false)}
        >
          <Coupon coupons={couponList} />
        </Modal>
      )}
    </P.ProductListStyle>
  );
}
