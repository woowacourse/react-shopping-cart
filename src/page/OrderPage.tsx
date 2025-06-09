import { useLocation, useNavigate } from 'react-router';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { useEffect, useMemo, useState } from 'react';
import * as styles from '../styles/page.style';
import OrderItem from '../components/CartItem/OrderItem';
import PriceArea from '../components/PriceArea/PriceArea';
import { CartItemType } from '../types/cartItem';
import CheckBox from '../components/common/CheckBox';
import { useCoupons } from '../hooks/useCoupons';
import { useToggle } from '../hooks/useToggle';
import { getBestCoupons } from '../components/Modal/utils/getBestCoupons';
import { Coupon } from '../types/coupon';
import { calculateCouponDiscount } from '../components/Modal/utils/calculateCouponDiscount';
import CouponModal from '../components/Modal/CouponModal';
import { isCouponDisabled } from '../components/Modal/utils/isCouponDisabled';
import { css } from '@emotion/react';

function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity, countOfItemType, totalAmount, checkedItems, deliveryFee, orderAmount } = location.state ?? {};
  const { value: includeSpecialRegions, toggle: toggleRegion } = useToggle(false);
  const totalDeliveryFee = includeSpecialRegions ? deliveryFee + 3000 : deliveryFee;
  const { data: coupons } = useCoupons();
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [tempCoupons, setTempCoupons] = useState<Coupon[]>([]);
  const { value: isOpen, on, off } = useToggle(false);

  const handleOpenModal = () => {
    setTempCoupons(selectedCoupons);
    on();
  };

  const handleTempToggle = (coupon: Coupon) => {
    if (isCouponDisabled(coupon, orderAmount, checkedItems)) return;
    setTempCoupons((prev: Coupon[]) => {
      const exists = prev.find((c) => c.id === coupon.id);
      if (exists) return prev.filter((c) => c.id !== coupon.id);
      if (prev.length < 2) return [...prev, coupon];
      return prev;
    });
  };

  const handleApplyCoupons = () => {
    setSelectedCoupons(tempCoupons);
    off();
  };

  const totalDiscount = useMemo(
    () =>
      selectedCoupons.reduce(
        (sum, c) => sum + calculateCouponDiscount(c, orderAmount, checkedItems, totalDeliveryFee),
        0
      ),
    [selectedCoupons, orderAmount, checkedItems, totalDeliveryFee]
  );

  const realTotalAmount = orderAmount + totalDeliveryFee - totalDiscount;

  useEffect(() => {
    if (coupons) setSelectedCoupons(getBestCoupons(coupons, orderAmount, checkedItems, deliveryFee));
  }, [coupons, orderAmount, checkedItems, deliveryFee]);

  useEffect(() => {
    if (
      !totalQuantity ||
      !countOfItemType ||
      !totalAmount ||
      !checkedItems ||
      !orderAmount ||
      deliveryFee === undefined
    ) {
      const isConfirmed = confirm('비정상적인 접근입니다. 장바구니로 이동하시겠습니까?');
      if (isConfirmed) {
        navigate('/');
      }
    }
    // totalQuantity, countOfItemType, totalAmount가 모두 불변값이므로 useEffect의 의존성 배열에 포함하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <img src="./assets/back.svg" />
          </button>
        }
      />
      <main css={styles.layoutCss}>
        <h1 css={styles.titleCss}>주문 확인</h1>
        <p css={styles.descriptionCss}>
          총 {countOfItemType}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <div css={cartItemsAreaCss}>
          <div css={cartItemsListCss}>
            {checkedItems.map((item: CartItemType) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
          <Button css={couponApplyCss} onClick={handleOpenModal}>
            쿠폰 적용
          </Button>
          <div css={priceTitleCss}>배송 정보</div>
          <div css={styles.allSelectCss}>
            <CheckBox checked={includeSpecialRegions} onChange={toggleRegion} />
            <p>제주도 및 도서 산간 지역</p>
          </div>
          <PriceArea
            orderAmount={orderAmount}
            deliveryFee={totalDeliveryFee}
            totalAmount={realTotalAmount}
            couponDiscount={totalDiscount}
          />
          <Button
            onClick={() => {
              navigate('/complete', {
                state: {
                  totalQuantity,
                  countOfItemType,
                  realTotalAmount
                }
              });
            }}
          >
            결제하기
          </Button>
        </div>
      </main>
      <CouponModal
        isOpen={isOpen}
        off={off}
        coupons={coupons ?? []}
        orderAmount={orderAmount}
        checkedItems={checkedItems}
        totalDeliveryFee={totalDeliveryFee}
        tempCoupons={tempCoupons}
        handleTempToggle={handleTempToggle}
        handleApplyCoupons={handleApplyCoupons}
      />
    </>
  );
}

export default OrderPage;

const priceTitleCss = css({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '12px',
  width: '100%'
});

const cartItemsListCss = css({
  width: '100%',
  height: '50%',
  overflow: 'auto'
});

const cartItemsAreaCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

const couponApplyCss = css({
  all: 'unset',
  width: '100%',
  backgroundColor: 'transparent',
  border: '1px solid #cccccc',
  color: '#555555',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '10px 0',
  textAlign: 'center',
  borderRadius: '5px',
  margin: '16px 0',
  cursor: 'pointer'
});
