import {
  StyledCartHeaderDescription,
  StyledCartHeaderTitle,
  StyledCartHeaderWrapper,
} from './CartHeader.styled';

export const CartHeader: React.FC<{ categoryCount: number }> = ({
  categoryCount,
}) => {
  return (
    <StyledCartHeaderWrapper>
      <StyledCartHeaderTitle>장바구니</StyledCartHeaderTitle>
      {categoryCount > 0 ? (
        <StyledCartHeaderDescription>
          현재 {categoryCount}종류의 상품이 담겨있습니다.
        </StyledCartHeaderDescription>
      ) : (
        <StyledCartHeaderDescription />
      )}
    </StyledCartHeaderWrapper>
  );
};
