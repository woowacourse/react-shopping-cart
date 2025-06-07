import { useNavigate } from 'react-router';
import * as styles from './OrderPage.styles';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import Image from '../components/Image/Image';
import { useState } from 'react';
import CouponModal from '../components/Modal/CouponModal';
import CheckBox from '../components/common/CheckBox';

type SelectedItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

function OrderPage() {
  const navigate = useNavigate();
  const items = getSelectedItemsFromStorage();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const orderAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShipping = orderAmount >= 100000;
  const deliveryFee = isFreeShipping ? 0 : isRemoteArea ? 3000 : 0;
  const [isOpen, setIsOpen] = useState(false);
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

        <div css={styles.summaryCss}>
          <p css={styles.priceTitleCss}>총 결제 금액</p>
          <p css={styles.priceCss}>{totalPrice.toLocaleString()}원</p>
        </div>
        <button onClick={() => setIsOpen(true)}>쿠폰 적용</button>
        <section css={styles.shippingCss}>
          <label>
            <CheckBox type="checkbox" checked={isRemoteArea} onChange={(e) => setIsRemoteArea(e.target.checked)} />
            제주도 및 도서 산간 지역
          </label>
          <p css={styles.shippingNoticeCss}>※ 총 주문 금액 100,000원 이상 시 무료 배송 됩니다.</p>
        </section>
        {isOpen && <CouponModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        <div css={styles.summaryCss}>
          <p css={styles.priceTitleCss}>총 주문 금액: {orderAmount.toLocaleString()}원</p>
          <p css={styles.priceTitleCss}>배송비: {deliveryFee.toLocaleString()}원</p>
          <p css={styles.priceCss}>총 결제 금액: {totalPrice.toLocaleString()}원</p>
        </div>
        <Button>결제하기</Button>
      </main>
    </>
  );
}

export default OrderPage;

function getSelectedItemsFromStorage(): SelectedItem[] {
  try {
    const data = localStorage.getItem('selectedItems');
    if (!data) return [];
    return JSON.parse(data) as SelectedItem[];
  } catch {
    return [];
  }
}

function SelectedItemCard({ item }: { item: SelectedItem }) {
  return (
    <div css={styles.cartItemFrameCss}>
      <div css={styles.cartItemInfoCss}>
        <Image css={styles.cartItemImgCss} src={item.imageUrl} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p css={styles.cartItemPriceCss}>{item.price.toLocaleString()}원</p>
          <p>{item.quantity}개</p>
        </div>
      </div>
    </div>
  );
}
