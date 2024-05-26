import { FlexRow, WhiteSpace } from "@/style/common.style";

import CartItem from "@/components/Cart/CartItem";
import CheckBox from "@/components/common/CheckBox";
import { cartListState } from "@/store/atoms/atoms";
import styled from "@emotion/styled";
import useAllSelected from "@/hooks/useAllSelected";
import { useRecoilValue } from "recoil";

const CartList = () => {
  const cartList = useRecoilValue(cartListState);
  const { isAllSelected, handleAllSelect } = useAllSelected();

  return (
    <StyledListWrapper>
      <StyledAllCheckBox>
        <CheckBox
          id="all-select-checkbox"
          isSelected={isAllSelected}
          onClick={handleAllSelect}
        />
        <span>전체선택</span>
      </StyledAllCheckBox>
      <StyledList>
        {cartList.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </StyledList>
    </StyledListWrapper>
  );
};
export default CartList;

const StyledListWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledAllCheckBox = styled.div`
  ${FlexRow}
  gap: 5px;
  align-items: center;
`;

const StyledList = styled.ul`
  padding-inline-start: 0;
`;
