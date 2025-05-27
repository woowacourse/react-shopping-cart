import * as S from "./Header.styles";

const Header = () => {
  const mockData = 2;
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.Description>현재 {mockData}종류의 상품이 담겨있습니다.</S.Description>
    </S.Container>
  );
};

export default Header;
