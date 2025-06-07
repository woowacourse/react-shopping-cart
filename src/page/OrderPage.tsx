import { useNavigate } from 'react-router';
import { css } from '@emotion/react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import Image from '../components/Image/Image';
import { useState } from 'react';
import CouponModal from '../components/Modal/CouponModal';

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
      <main css={layoutCss}>
        <h1 css={titleCss}>주문 확인</h1>
        <p css={descriptionCss}>
          총 {items.length}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>

        {items.map((item) => (
          <SelectedItemCard key={item.id} item={item} />
        ))}

        <div css={summaryCss}>
          <p css={priceTitleCss}>총 결제 금액</p>
          <p css={priceCss}>{totalPrice.toLocaleString()}원</p>
        </div>
        <button onClick={() => setIsOpen(true)}>쿠폰 적용</button>
        {isOpen && <CouponModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
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
    <div css={cartItemFrameCss}>
      <div css={cartItemInfoCss}>
        <Image css={cartItemImgCss} src={item.imageUrl} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p css={cartItemPriceCss}>{item.price.toLocaleString()}원</p>
          <p>{item.quantity}개</p>
        </div>
      </div>
    </div>
  );
}

const layoutCss = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 24px',
  gap: '16px',
  height: '100%'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: 'bold'
});

const descriptionCss = css({
  fontSize: '12px',
  lineHeight: 1.5
});

const summaryCss = css({
  marginTop: '24px',
  textAlign: 'right'
});

const priceTitleCss = css({
  fontSize: '14px',
  color: '#888'
});

const priceCss = css({
  fontSize: '20px',
  fontWeight: 'bold'
});

const cartItemFrameCss = css({
  borderTop: '1px solid #ccc',
  padding: '16px 0'
});

const cartItemInfoCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});

const cartItemImgCss = css({
  width: '112px',
  height: '112px',
  borderRadius: '8px',
  objectFit: 'cover'
});

const cartItemPriceCss = css({
  fontSize: '16px',
  fontWeight: 'bold'
});
