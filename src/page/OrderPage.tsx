import { useNavigate } from 'react-router';
import * as styles from './OrderPage.styles';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { useState } from 'react';
import CouponModal from '../components/Modal/CouponModal';
import CheckBox from '../components/common/CheckBox';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import PriceRow from '../components/PriceArea/PriceRow';
import { calculateDeliveryFee } from '../utils/coupon/calculate';
import { STORAGE_KEYS } from '../constants/localStorageKey';
import { PATH } from '../constants/path';
import SelectedItemCard from './SelectedItemCard';

export type SelectedItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

function OrderPage() {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isRemoteArea, setIsRemoteArea] = useState(() => localStorage.getItem('isRemoteArea') === 'true');
  const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
  const navigate = useNavigate();
  const items = getLocalStorage<SelectedItem[]>('selectedItems', []);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalOrderAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const basicDeliveryFee = calculateDeliveryFee(totalOrderAmount);
  const remoteAreaExtraFee = isRemoteArea ? 3000 : 0;
  const totalDeliveryFee = basicDeliveryFee + remoteAreaExtraFee;

  const finalPaymentAmount = totalOrderAmount + totalDeliveryFee - totalCouponDiscount;

  const handlePaymentButtonClick = () => {
    navigate(PATH.PAYMENT, {
      state: {
        totalPaymentAmount: finalPaymentAmount
      }
    });
  };

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <img src="./assets/back.svg" alt="뒤로가기" />
          </button>
        }
      />
      <main css={styles.layoutCss}>
        <h1 css={styles.titleCss}>주문 확인</h1>
        <p css={styles.descriptionCss}>
          총 {items.length}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>

        {items.map((item) => (
          <SelectedItemCard key={item.id} item={item} />
        ))}

        <button css={styles.buttonCss} onClick={() => setIsCouponModalOpen(true)}>
          쿠폰 적용
        </button>
        <section css={styles.shippingCss}>
          <CheckBox
            type="checkbox"
            checked={isRemoteArea}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsRemoteArea((prev: boolean) => !prev);
              setLocalStorage(STORAGE_KEYS.IS_REMOTE_AREA, checked);
            }}
          />
          <label> 제주도 및 도서 산간 지역 </label>
          <p css={styles.shippingNoticeCss}>
            <img src="./assets/info.svg" alt="info icon" />
            <span> 총 주문 금액 100,000원 이상 시 무료 배송 됩니다.</span>
          </p>
        </section>
        {isCouponModalOpen && (
          <CouponModal
            isOpen={isCouponModalOpen}
            onClose={() => setIsCouponModalOpen(false)}
            onApplyDiscount={(discount) => setTotalCouponDiscount(discount)}
          />
        )}
        <div css={styles.summaryCss}>
          <PriceRow label="총 주문 금액" amount={totalOrderAmount} />
          <PriceRow label="배송비" amount={totalDeliveryFee} />

          {totalCouponDiscount > 0 && <PriceRow minus={true} label="할인 금액" amount={totalCouponDiscount} />}
          <PriceRow label="총 결제 금액" amount={finalPaymentAmount} />
        </div>
        <Button onClick={handlePaymentButtonClick}>결제하기</Button>
      </main>
    </>
  );
}

export default OrderPage;
