import styled from '@emotion/styled';
import { HighlightTextWrapper } from 'components/shared/commonStyles';

const Root = styled.section`
  margin: 60px 0;
`;

const Order = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 80px;
`;

const OrderListContainer = styled.div`
  flex: 1;
`;

const OrderListHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding-bottom: 24px;
  border-bottom: 4px solid ${(props) => props.theme.borderColor.darkGrey};
`;

const PriceOverviewWrapper = styled.div`
  margin-top: 4px;
`;

const OrderItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

export default {
  Root,
  Order,
  OrderListContainer,
  OrderListHeader,
  PriceOverviewWrapper,
  HighlightTextWrapper,
  OrderItemList,
};
