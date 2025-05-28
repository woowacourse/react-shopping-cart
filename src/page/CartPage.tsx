import { Link } from 'react-router';
import Header from '../components/Header';
import { css } from '@emotion/react';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { RemoveButton } from '../components/RemoveButton';
import Stepper from '../components/Stepper';

const mockCartItems = [
  {
    id: 1,
    name: '상품이름A',
    price: 17500,
    quantity: 2,
    imageUrl:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR8HfgVRk_oQs_K8uaTLGXt1cq59yOG3Z-JdKD4nXPcfUJnmTm7x3phMM6lddMq7aiLLDCzRq8W4j2H-6QRgcT_r2Kdp-ir8PmqkD6_Jk9usnJM7uWhdh2erw&usqp=CAc'
  },
  {
    id: 2,
    name: '상품이름B',
    price: 12500,
    quantity: 2,
    imageUrl:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQEhXrs9oAeKjUUTCfkjUGzjs3dgxNpZS50ottI1QbRTOlE3gNqDVwK9rUaQLhU-joHT_BlkQfkbf8ysTElbo5VppXWsHrh37k4hQ07qgNJSPn2cJLi3YhDFQVTydBYujilUr_o007lIQE&usqp=CAc'
  },
  {
    id: 3,
    name: '상품이름B',
    price: 12500,
    quantity: 2,
    imageUrl:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQEhXrs9oAeKjUUTCfkjUGzjs3dgxNpZS50ottI1QbRTOlE3gNqDVwK9rUaQLhU-joHT_BlkQfkbf8ysTElbo5VppXWsHrh37k4hQ07qgNJSPn2cJLi3YhDFQVTydBYujilUr_o007lIQE&usqp=CAc'
  }
];

function CartPage() {
  return (
    <>
      <Header
        left={
          <Link to="/confirm" css={logoCss}>
            SHOP
          </Link>
        }
      />
      <main css={layoutCss}>
        <section>
          <h1 css={titleCss}>장바구니</h1>
          {mockCartItems.length !== 0 && <p>총 {mockCartItems.length}개의 상품이 담겨 있습니다.</p>}
        </section>
        <div css={cartItemsAreaCss}>
          {mockCartItems.length === 0 ? (
            <p>장바구니에 담은 상품이 없습니다.</p>
          ) : (
            <div css={cartItemsListCss}>
              <div css={allSelectCss}>
                <CheckBox />
                <p>전체 선택</p>
              </div>
              {mockCartItems.map((item) => (
                <div key={item.id} css={cartItemFrameCss}>
                  <div css={cartItemHeaderCss}>
                    <CheckBox />
                    <RemoveButton />
                  </div>
                  <div css={cartItemInfoCss}>
                    <img css={cartItemImgCss} src={item.imageUrl} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <Stepper value={item.quantity} onDecrement={() => {}} onIncrement={() => {}} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Button>주문 확인</Button>
    </>
  );
}

export default CartPage;

const logoCss = css({
  color: 'white',
  fontWeight: 800,
  fontSize: '20px'
});

const layoutCss = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '36px 24px'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: '700'
});

const cartItemsAreaCss = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flex: 1
});

const allSelectCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  marginBottom: '16px'
});

const cartItemFrameCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderTop: '1px solid #ccc',
  padding: '16px 0'
});

const cartItemHeaderCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
});

const cartItemInfoCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
  marginTop: '8px'
});

const cartItemImgCss = css({
  width: '112px',
  height: '112px',
  borderRadius: '8px',
  objectFit: 'cover'
});

const cartItemsListCss = css({
  width: '100%',
  overflow: 'scroll'
});
