import * as S from './styled';

interface ShoppingCartDescriptionProps {
  kindCount: number;
}

const ShoppingCartDescription = ({ kindCount }: ShoppingCartDescriptionProps) => {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {kindCount !== 0 && (
        <S.Description>{`현재 ${kindCount}종류의 상품이 담겨있습니다.`}</S.Description>
      )}
    </S.Container>
  );
};

export default ShoppingCartDescription;
