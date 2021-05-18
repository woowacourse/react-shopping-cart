import styled from 'styled-components';
import { Button, List, Template } from '../../components';
import { COLOR } from '../../constants';

export const Page = styled(Template)`
  background-color: ${COLOR.GRAY_100};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
`;

export const OrderList = styled(List)``;

export const OrderItem = styled.li``;

export const OrderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding: 1.5rem 1.5rem;
  background-color: ${COLOR.GRAY_50};
  border-width: 0.0625rem 0.0625rem 0 0.0625rem;
  border-style: solid;
  border-color: ${COLOR.GRAY_500};
  box-sizing: border-box;
`;

export const OrderNumber = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 400;
  color: ${COLOR.GRAY_800};
`;

export const ToDetailButton = styled(Button)`
  font-size: 1.125rem;
  color: ${COLOR.GRAY_800};
`;

export const OrderedProductList = styled(List)`
  margin-top: 0;
  margin-bottom: 2.5rem;
  background-color: ${COLOR.WHITE};
  border-top-width: 0;

  & > li {
    border-width: 0.0625rem 0.0625rem 0 0.0625rem;
    border-style: solid;
    border-color: ${COLOR.GRAY_500};
  }
  & > li:last-child {
    border-bottom: 0.0625rem solid ${COLOR.GRAY_500};
  }
`;
