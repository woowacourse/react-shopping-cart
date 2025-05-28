import * as S from "./Header.styles";

const Header = ({
  selectedCartItemCount,
}: {
  selectedCartItemCount: number;
}) => {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.Description>
        현재 {selectedCartItemCount}종류의 상품이 담겨있습니다.
      </S.Description>
    </S.Container>
  );
};

export default Header;
