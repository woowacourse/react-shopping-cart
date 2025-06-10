import { useLocation, useNavigate } from 'react-router';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { useEffect } from 'react';
import * as styles from '../styles/page.style';
import OrderItem from '../components/CartItem/OrderItem';
import PriceArea from '../components/PriceArea/PriceArea';
import { CartItemType } from '../types/cartItem';
import CheckBox from '../components/common/CheckBox';
import CouponModal from '../components/Modal/CouponModal';
import { css } from '@emotion/react';
import { useDeliveryFee } from '../hooks/useDeliveryFee';
import { useCouponSelector } from '../hooks/useCouponSelector';

function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity, countOfItemType, totalAmount, checkedItems, deliveryFee, orderAmount } = location.state ?? {};
  const { isSpecialDelivery, toggleSpecialDelivery, totalFee } = useDeliveryFee(deliveryFee);
  const { coupons, temp, isOpen, totalDiscount, handleOpen, handleClose, toggleCoupon, apply } = useCouponSelector(
    orderAmount,
    checkedItems,
    totalFee
  );
  const totalAmountAfterDiscount = orderAmount + totalFee - totalDiscount;

  const navigateToComplete = () => {
    navigate('/complete', {
      state: {
        totalQuantity,
        countOfItemType,
        totalAmountAfterDiscount
      }
    });
  };

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
          <Button css={couponApplyCss} onClick={handleOpen}>
            쿠폰 적용
          </Button>
          <div css={priceTitleCss}>배송 정보</div>
          <div css={styles.allSelectCss}>
            <CheckBox checked={isSpecialDelivery} onChange={toggleSpecialDelivery} />
            <p>제주도 및 도서 산간 지역</p>
          </div>
          <PriceArea
            orderAmount={orderAmount}
            deliveryFee={totalFee}
            totalAmount={totalAmountAfterDiscount}
            couponDiscount={totalDiscount}
          />
          <Button onClick={navigateToComplete}>결제하기</Button>
        </div>
      </main>
      <CouponModal
        isOpen={isOpen}
        handleClose={handleClose}
        coupons={coupons ?? []}
        orderAmount={orderAmount}
        checkedItems={checkedItems}
        totalDeliveryFee={totalFee}
        temp={temp}
        toggleCoupon={toggleCoupon}
        apply={apply}
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
