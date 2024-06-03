import * as S from './CartHeader.style';

export default function CartHeader({ count }: { count: number }) {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {count !== 0 && <S.SubTitle>현재 {count}종류의 상품이 담겨있습니다.</S.SubTitle>}
    </S.Container>
  );
}
