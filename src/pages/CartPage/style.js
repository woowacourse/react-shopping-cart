import styled from 'styled-components';

import { Button, CheckoutBox, List, Template } from '../../components';
import { COLOR, PATTERN_FILE_NAME } from '../../constants';

export const Page = styled(Template)`
  background-color: ${COLOR.HEX.WHITE};
`;

export const Main = styled.main`
  display: flex;
  margin: 0 auto;
  width: 95%;
`;

export const OrderOptionsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  width: 63%;
`;

export const OrderOptionsController = styled.p`
  display: flex;
  justify-content: space-between;
`;

export const DeleteButton = styled(Button)`
  width: 7.375rem;
  height: 3.125rem;
  font-size: 1rem;
  color: ${COLOR.HEX.GRAY_800};
  border: 0.0625rem solid ${COLOR.HEX.GRAY_400};

  &:disabled {
    cursor: default;
    color: ${COLOR.HEX.GRAY_400};
  }
`;

export const ListLabel = styled.h3`
  font-size: 1.25rem;
`;

export const CartProductList = styled(List)`
  border-top: 0.0625rem solid ${COLOR.HEX.GRAY_500};

  & > li {
    border-top: 0.0625rem solid ${COLOR.HEX.GRAY_500};
  }
`;

export const CheckoutSection = styled.section`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 1.5rem;
  width: 37%;
`;

export const StickyCheckoutBox = styled(CheckoutBox)`
  position: -webkit-sticky;
  position: sticky;
  top: 15%;
  margin-top: 4.875rem;
  width: 100%;
`;

/* Item */

export const Container = styled.li`
  padding: 1.5rem 0.25rem;
  box-sizing: border-box;
  display: flex;
`;

export const Name = styled.span`
  flex-grow: 1;
  padding-left: 1.25rem;
  font-size: 1.25rem;
  color: ${COLOR.HEX.GRAY_800};
`;

export const Controller = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Price = styled.span`
  font-size: 1rem;
  color: ${COLOR.HEX.GRAY_800};
  text-align: right;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 9rem;
`;
