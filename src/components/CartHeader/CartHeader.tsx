import { Title, SubTitle, CartHeaderStyle } from './CartHeader.style';

export default function CartHeader({ count }: { count: number }) {
  return (
    <CartHeaderStyle>
      <Title>장바구니</Title>
      <SubTitle>현재 {count}종류의 상품이 담겨있습니다.</SubTitle>
    </CartHeaderStyle>
  );
}
