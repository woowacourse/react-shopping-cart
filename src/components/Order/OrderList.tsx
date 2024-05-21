import OrderItem from './OrderItem';
import { WhiteSpace } from '@/style/common.style';
import { orderItemState } from '@/store/selectors/orderItemSelector';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

const OrderList = () => {
  const orderedItems = useRecoilValue(orderItemState);
  return (
    <StyledListWrapper>
      <StyledList>
        {orderedItems.map((item) => (
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
