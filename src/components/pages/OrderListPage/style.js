import styled from 'styled-components';
import { Button, List, Template } from '../../commons';

export const Page = styled(Template)`
  background-color: #eeeeee;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
  height: 100%;
`;

export const ListLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding: 1.5rem 1.5rem;
  background-color: #f6f6f6;
  border-width: 0.0625rem 0.0625rem 0 0.0625rem;
  border-style: solid;
  border-color: #aaaaaa;
  box-sizing: border-box;
`;

export const OrderNumber = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 400;
  color: #333333;
`;

export const ToDetailButton = styled(Button)`
  font-size: 1.125rem;
  color: #333333;
`;

export const OrderList = styled(List)`
  margin-top: 0;
  margin-bottom: 2.5rem;
  background-color: #ffffff;
  border-top-width: 0;

  & > li {
    border-width: 0.0625rem 0.0625rem 0 0.0625rem;
    border-style: solid;
    border-color: #aaaaaa;
  }
  & > li:last-child {
    border-bottom: 0.0625rem solid #aaaaaa;
  }
`;
