import styled from 'styled-components';

import { Button, List, Template } from '../../components';
import { COLOR, PATTERN_FILE_NAME } from '../../constants';

export const Page = styled(Template)`
  background-color: ${COLOR.HEX.GRAY_100};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
`;

export const OrderList = styled(List);

export const OrderItem = styled.li``;

export const OrderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding: 1.5rem 1.5rem;
  background-color: ${COLOR.HEX.GRAY_50};
  border-width: 0.0625rem 0.0625rem 0 0.0625rem;
  border-style: solid;
  border-color: ${COLOR.HEX.GRAY_500};
  box-sizing: border-box;
`;

export const OrderNumber = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 400;
  color: ${COLOR.HEX.GRAY_800};
`;

export const ToDetailButton = styled(Button)`
  font-size: 1.125rem;
  color: ${COLOR.HEX.GRAY_800};
`;

export const OrderedProductList = styled(List)`
  margin-top: 0;
  margin-bottom: 2.5rem;
  background-color: ${COLOR.HEX.WHITE};
  border-top-width: 0;

  & > li {
    border-width: 0.0625rem 0.0625rem 0 0.0625rem;
    border-style: solid;
    border-color: ${COLOR.HEX.GRAY_500};
  }
  & > li:last-child {
    border-bottom: 0.0625rem solid ${COLOR.HEX.GRAY_500};
  }
`;

/* Item */

export const Container = styled.li`
  display: flex;
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 1.25rem;
`;

export const Name = styled.span`
  font-size: 1.25rem;
  color: ${COLOR.HEX.GRAY_800};
`;

export const OrderSummary = styled.span`
  font-size: 1rem;
  padding-top: 1.5rem;
  color: ${COLOR.HEX.GRAY_600};
`;

export const AddToCartButton = styled(Button)`
  font-size: 1.25rem;
  background-color: ${COLOR.HEX.CYAN_500};
  color: ${COLOR.HEX.WHITE};
  width: 8.625rem;
  height: 3rem;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 8.75rem;
`;
