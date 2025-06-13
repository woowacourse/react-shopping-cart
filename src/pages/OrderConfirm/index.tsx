import * as S from './index.styles';
import Header from '../../components/feature/CartSection/Header';
import {useSelectedItems} from '../../provider/cartItemsProvider';
import {calcOrderPrice} from '../../feature/calcOrderPrice';
import Card from '../../components/feature/CartSection/CartProducts/Card';
import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import PriceSection from '../../components/feature/CartSection/PriceSection';
import {useState} from 'react';
import {Modal} from '@muffin2219/components';
import Coupon from '../../components/feature/ModalContent/Coupon';
import {findCanApplyCoupon} from '../../feature/findApplyCoupon';
import {useCoupons} from '../../hooks/useCoupons';
import {useNavigate} from 'react-router';
import {ROUTE_PATHS} from '../../route/path';
import {calcDiscountPrice} from '../../feature/calcDiscountPrice';
import {CouponKey} from '../../type/coupon';
import {css} from '@emotion/react';
import {couponKeyToCode} from '../../constant/coupons';

const ADDITIONAL_DELIVERY_PRICE = 3_000;

const OrderConfirm = () => {
  const navigate = useNavigate();

  const selectedItems = useSelectedItems();
  const {orderPrice, deliveryPrice, totalAmount} =
    calcOrderPrice(selectedItems);

  const [isOpen, setIsOpen] = useState(false);
  const [isAdditionalDelivery, setIsAdditionalDelivery] = useState(false);
  const {isCouponChecked, coupons, handleCouponsChecked} = useCoupons();

  const calcDeliveryPrice = () => {
    if (isCouponChecked.freeShipping) return 0;
    if (isAdditionalDelivery) return deliveryPrice + ADDITIONAL_DELIVERY_PRICE;
    return deliveryPrice;
  };

  const canApplyCoupons = findCanApplyCoupon(
    coupons,
    Number(orderPrice),
    selectedItems,
    isAdditionalDelivery
      ? deliveryPrice + ADDITIONAL_DELIVERY_PRICE
      : deliveryPrice
  );

  const checkedCodes = Object.keys(isCouponChecked)
    .filter((key) => isCouponChecked[key as CouponKey])
    .map((key) => couponKeyToCode[key as CouponKey]);

  const totalPaymentPrice =
    calcDiscountPrice(
      Number(orderPrice),
      coupons?.filter((coupon) => checkedCodes?.includes(coupon?.code)) || [],
      selectedItems
    ) + calcDeliveryPrice();

  return (
    <S.Container>
      <S.Wrapper>
        <Header
          title="주문 확인"
          description={`총 ${selectedItems.length}종류의 상품 ${totalAmount}개를 주문합니다. 최종 결제 금액을 확인해 주세요.`}
        />
        <S.CartList>
          {selectedItems?.map((cartItem) => (
            <Card key={cartItem.id} cartItem={cartItem} interactive={false} />
          ))}
        </S.CartList>
        <Button title="쿠폰 적용" onClick={() => setIsOpen(true)} />
        <S.Description>배송 정보</S.Description>
        <CheckBox
          label="제주도 및 도서 산간 지역"
          isChecked={isAdditionalDelivery}
          onChange={() => {
            setIsAdditionalDelivery(!isAdditionalDelivery);
          }}
        />
        <PriceSection
          orderPrice={orderPrice}
          discountPrice={orderPrice - totalPaymentPrice + calcDeliveryPrice()}
          deliveryPrice={calcDeliveryPrice()}
          totalPrice={totalPaymentPrice}
        />
      </S.Wrapper>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Coupon
          couponInfo={coupons}
          canApplyCouponCode={canApplyCoupons?.map((coupon) => coupon.code)}
          isCouponChecked={isCouponChecked}
          onChange={handleCouponsChecked}
          discountPrice={orderPrice - totalPaymentPrice + calcDeliveryPrice()}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <Button
        title="결제하기"
        mode="dark"
        css={css`
          padding: 24px 0;
        `}
        onClick={() => {
          navigate(ROUTE_PATHS.PAYMENT_CONFIRM, {
            state: {
              sort: selectedItems.length,
              totalAmount: totalAmount,
              totalPrice: totalPaymentPrice,
            },
          });
        }}
      />
    </S.Container>
  );
};

export default OrderConfirm;
