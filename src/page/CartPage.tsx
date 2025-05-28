import { Link } from 'react-router';
import Header from '../components/Header';
import { css } from '@emotion/react';
import Button from '../components/Button';
import CartItemList from '../components/CartItemList';

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
  },
  {
    id: 4,
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
        <h1 css={titleCss}>장바구니</h1>
        {mockCartItems.length !== 0 && <p>총 {mockCartItems.length}개의 상품이 담겨 있습니다.</p>}
        <CartItemList cartItems={mockCartItems} />
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
  padding: '36px 24px',
  height: '100%'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: '700'
});
