import styled from '@emotion/styled';
import { HighlightTextWrapper, SpinnerWrapper } from 'components/shared/commonStyles';

const Root = styled.section`
  margin: 60px 20px;
`;

const Cart = styled.div`
  display: flex;
  margin: 50px 0;
  gap: 80px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const CartListContainer = styled.div`
  flex: 1;
`;

const CartListOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 26px;
`;

const DeleteButton = styled.button`
  border: 1px solid #bbbbbb;
  background: none;
  color: inherit;
  font-family: inherit;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  width: 117px;
  height: 50px;
`;

const CartListHeader = styled.div`
  font-size: 20px;
  padding-bottom: 16px;
  border-bottom: 4px solid #aaaaaa;
`;

const CartItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

const PriceOverviewWrapper = styled.div`
  margin-top: 42px;
`;

export default {
  Root,
  Cart,
  CartListContainer,
  CartListOption,
  DeleteButton,
  CartListHeader,
  CartItemList,
  PriceOverviewWrapper,
  HighlightTextWrapper,
  SpinnerWrapper,
};
