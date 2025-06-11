import * as Styled from "../CartContent/CartContent.style";
import CheckBox from "@/components/common/CheckBox";

interface CartSectionHeaderProps {
  itemCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
}

function CartSectionHeader({
  itemCount,
  isAllSelected,
  onSelectAll,
}: CartSectionHeaderProps) {
  return (
    <>
      <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
      {itemCount !== 0 ? (
        <>
          <Styled.CartContentDescription>
            현재 {itemCount}종류의 상품이 담겨있습니다.
          </Styled.CartContentDescription>
          <Styled.AllSelectWrapper>
            <CheckBox
              id="select-all-checkbox"
              checked={isAllSelected}
              onChange={onSelectAll}
              label="전체선택"
              boxSize="medium"
            />
          </Styled.AllSelectWrapper>
        </>
      ) : null}
    </>
  );
}

export default CartSectionHeader;
