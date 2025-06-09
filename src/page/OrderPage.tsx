import { useLocation, useNavigate } from 'react-router';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { useEffect } from 'react';
import * as styles from '../styles/page.style';
import OrderItem from '../components/CartItem/OrderItem';
import PriceArea from '../components/PriceArea/PriceArea';
import { CartItemType } from '../types/cartItem';
import { css } from '@emotion/react';
import CheckBox from '../components/common/CheckBox';
import { useCoupons } from '../hooks/useCoupons';
import { useToggle } from '../hooks/useToggle';
import Modal from '../components/Modal/Modal';
import CouponItem from '../components/Modal/CouponItem';
import { getBestCoupons } from '../components/Modal/getBestCoupons';

function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity, countOfItemType, totalAmount, checkedItems, deliveryFee, orderAmount } = location.state ?? {};
  const { value: includeSpecialRegions, toggle } = useToggle(false);
  const totalDeliveryFee = includeSpecialRegions ? deliveryFee + 3000 : deliveryFee;
  const { data: coupons } = useCoupons();
  const { value: isOpen, on, off } = useToggle(false);
  const { appliedCoupons, totalDiscount } = getBestCoupons(
    coupons ?? [], // 전체 쿠폰 리스트
    orderAmount, // 주문 금액
    checkedItems, // CartItemType[] (각 item.price, item.quantity 필요)
    deliveryFee // 기본 배송비
  );
  const realTotalAmount = orderAmount + totalDeliveryFee - totalDiscount;

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
          <Button css={couponApplyCss} onClick={on}>
            쿠폰 적용
          </Button>
          <div css={priceTitleCss}>배송 정보</div>
          <div css={styles.allSelectCss}>
            <CheckBox checked={includeSpecialRegions} onChange={toggle} />
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
      <Modal isOpen={isOpen} handleClose={off}>
        <div css={styles.infoCss}>
          <img src="./assets/info.svg" alt="info icon" />
          <p css={styles.fontSize12}>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
        </div>
        {coupons?.map((coupon) => (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            orderAmount={orderAmount}
            items={checkedItems}
            appliedCoupons={appliedCoupons}
          />
        ))}
        <Button css={buttonCss} onClick={off}>
          총 {totalDiscount.toLocaleString()}원 할인쿠폰 사용하기
        </Button>
      </Modal>
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

const buttonCss = css({
  all: 'unset',
  borderRadius: '5px',
  backgroundColor: '#333333',
  textAlign: 'center',
  width: '100%',
  cursor: 'pointer',
  border: 'none',
  minHeight: '44px',
  color: 'white',
  fontSize: '15px',
  fontWeight: 'bold'
});
