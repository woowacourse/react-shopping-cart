import * as S from './index.styles';
import Header from '../../components/feature/CartSection/Header';
import {useSelectedItems} from '../../provider/cartItemsProvider';
import {calcOrderHistory} from '../../feature/calcOrderPrice';
import Card from '../../components/feature/CartSection/CartProducts/Card';
import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import PriceSection from '../../components/feature/CartSection/PriceSection';
import {useEffect, useState} from 'react';
import {Modal} from '@muffin2219/components';
import Coupon from '../../components/feature/ModalContent/Coupon';
import {css} from '@emotion/react';
import {useShowError} from '../../provider/errorProvider';
import {CouponType} from '../../type/coupon';
import {getCoupons} from '../../api/coupon/getCoupon';
import {findCanApplyCoupon} from '../../feature/calcCouponPrice';

const buttonStyle = css`
  padding: 24px 0;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
`;
const ADDITIONAL_DELIVERY_PRICE = 3_000;

const OrderConfirm = () => {
  const selectedItems = useSelectedItems();
  const {orderPrice, deliveryPrice, totalAmount, totalPrice} =
    calcOrderHistory(selectedItems);

  const [isOpen, setIsOpen] = useState(false);
  const [isAdditionalDelivery, setIsAdditionalDelivery] = useState(false);
  const [isCouponChecked, setIsCouponChecked] = useState({
    FIXED5000: false,
    BOGO: false,
    FREESHIPPING: false,
    MIRACLESALE: false,
  });

  const showError = useShowError();
  const [coupons, setCoupons] = useState<CouponType[]>();

  useEffect(() => {
    const getCouponData = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (e) {
        showError('쿠폰 정보를 불러올 수 없습니다.');
      }
    };

    getCouponData();
  }, [showError]);

  const calcDeliveryPrice = () => {
    if (isCouponChecked.FREESHIPPING) return 0;
    if (isAdditionalDelivery) return deliveryPrice + ADDITIONAL_DELIVERY_PRICE;
    return deliveryPrice;
  };

  const canApplyCoupons = findCanApplyCoupon(
    coupons,
    Number(orderPrice),
    selectedItems,
    calcDeliveryPrice()
  );
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
          deliveryPrice={calcDeliveryPrice()}
          totalPrice={totalPrice}
        />
      </S.Wrapper>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Coupon
          couponInfo={coupons}
          canApplyCouponCode={canApplyCoupons?.map((coupon) => coupon.code)}
          isCouponChecked={isCouponChecked}
          onChange={(e) => {
            setIsCouponChecked((prev) => ({
              ...prev,
              [e.target.name]: !isCouponChecked[e.target.name],
            }));
          }}
        />
      </Modal>
      <Button title="결제하기" css={buttonStyle} onClick={() => {}} />
    </S.Container>
  );
};

export default OrderConfirm;
