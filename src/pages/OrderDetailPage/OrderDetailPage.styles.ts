import styled from '@emotion/styled';
import { HighlightTextWrapper } from 'components/shared/commonStyles';

const Root = styled.section`
  padding: 60px 20px;
`;

const Order = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor.lightGrey};
  border-bottom: none;
  margin-top: 55px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px 30px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor.lightGrey};
  background-color: ${(props) => props.theme.bgColor.secondary};
`;

const OrderNumber = styled.span`
  font-size: 20px;
  letter-spacing: 0.5px;
`;

const DetailButton = styled.span`
  font-size: 20px;
  letter-spacing: 0.5px;
`;

const PurchasedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const PriceOverviewWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
export default {
  Root,
  Order,
  OrderHeader,
  OrderNumber,
  DetailButton,
  PurchasedList,
  PriceOverviewWrapper,
  HighlightTextWrapper,
};
