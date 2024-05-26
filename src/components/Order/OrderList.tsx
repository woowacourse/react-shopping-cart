import OrderItem from "./OrderItem";
import { WhiteSpace } from "@/style/common.style";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

const OrderList = () => {
  const selectedList = useRecoilValue(selectedItemsState);

  return (
    <StyledListWrapper>
      <StyledList>
        {selectedList.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </StyledList>
    </StyledListWrapper>
  );
};
export default OrderList;

const StyledListWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledList = styled.ul`
  padding-inline-start: 0;
`;
