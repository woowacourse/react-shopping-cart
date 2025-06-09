import { useNavigate } from 'react-router';
import * as styles from './OrderPage.styles';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import Image from '../components/Image/Image';
import { useState } from 'react';
import CouponModal from '../components/Modal/CouponModal';
import CheckBox from '../components/common/CheckBox';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import PriceRow from '../components/PriceArea/PriceRow';

export type SelectedItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

function OrderPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [isRemoteArea, setIsRemoteArea] = useState(() => localStorage.getItem('isRemoteArea') === 'true');

  const navigate = useNavigate();
  const items = getLocalStorage<SelectedItem[]>('selectedItems', []);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const baseDeliveryFee = totalPrice >= 100000 ? 0 : 3000;
  const extraRemoteFee = isRemoteArea ? 3000 : 0;
  const deliveryFee = baseDeliveryFee + extraRemoteFee;

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

        <button onClick={() => setIsOpen(true)}>쿠폰 적용</button>
        <section css={styles.shippingCss}>
          <label>
            <CheckBox
              type="checkbox"
              checked={isRemoteArea}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsRemoteArea((prev: boolean) => !prev);
                setLocalStorage('isRemoteArea', checked);
              }}
            />
            제주도 및 도서 산간 지역
          </label>
          <p css={styles.shippingNoticeCss}>
            <img src="./assets/info.svg" alt="info icon" /> 총 주문 금액 100,000원 이상 시 무료 배송 됩니다.
          </p>
        </section>
        {isOpen && <CouponModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        <div css={styles.summaryCss}>
          <PriceRow label="총 주문 금액" amount={totalPrice} />
          <PriceRow label="배송비" amount={deliveryFee} />
          <PriceRow label="총 결제 금액" amount={totalPrice} />
        </div>
        <Button>결제하기</Button>
      </main>
    </>
  );
}

export default OrderPage;

function SelectedItemCard({ item }: { item: SelectedItem }) {
  return (
    <div css={styles.cartItemFrameCss}>
      <div css={styles.cartItemInfoCss}>
        <Image css={styles.cartItemImgCss} src={item.imageUrl} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p css={styles.cartItemPriceCss}>{(item.price * item.quantity).toLocaleString()}원</p>
          <p>{item.quantity}개</p>
        </div>
      </div>
    </div>
  );
}
