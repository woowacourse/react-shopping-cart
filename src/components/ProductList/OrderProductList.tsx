import { useRecoilValue } from 'recoil';
import {
  calculateOrderPrice,
  checkedCartItems,
  fetchCouponList,
} from '../../recoil/selectors';

import { Modal } from 'soha-components';

import CheckBox from '../CheckBox/CheckBox';
import OrderProductItem from '../ProductItem/OrderProductItem';
import ProductTotalPriceList from '../ProductTotalPriceList/ProductTotalPriceList';

import * as P from './ProductList.style';
import * as OP from './OrderProductList.style';
import { useState } from 'react';
import Coupon from '../Coupon/Coupon';

export default function OrderProductList() {
  const order = useRecoilValue(checkedCartItems);
  const { totalOrderPrice, deliveryFee, totalPrice } =
    useRecoilValue(calculateOrderPrice);
  const couponList = useRecoilValue(fetchCouponList);

  const [isCheck, setIsCheck] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const priceList: PriceList = {
    0: ['주문 금액', totalOrderPrice],
    1: ['쿠폰 할인 금액', 6000],
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
              setIsCheck(!isCheck);
            }}
            isCheck={isCheck}
          />
          <span className="delivery-info_explanation">
            제주도 및 도서 산간 지역
          </span>
        </div>
      </OP.DeliveryInfo>
      <ProductTotalPriceList priceList={priceList} totalPrice={totalPrice} />
      {openModal && (
        <Modal
          position="center"
          title="쿠폰을 선택해 주세요"
          closeButton="img"
          closeModalClick={() => setOpenModal(false)}
          buttonText="총 00원 할인 쿠폰 사용하기"
          buttonClick={() => alert('쿠폰 적용 완료')}
        >
          <Coupon coupons={couponList} />
        </Modal>
      )}
    </P.ProductListStyle>
  );
}
