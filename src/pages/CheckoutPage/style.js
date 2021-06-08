import styled from 'styled-components';

import { CheckoutBox, List, Template } from '../../components';
import { COLOR, PATTERN_FILE_NAME } from '../../constants';

export const Page = styled(Template)`
  background-color: ${COLOR.HEX.WHITE};
`;

export const Main = styled.main`
  display: flex;
  margin: 0 auto;
  width: 95%;
`;

export const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  width: 63%;
`;

export const ListLabel = styled.h3`
  font-size: 1.25rem;
`;

export const CheckoutProductList = styled(List)`
  border-top: 0.0625rem solid ${COLOR.HEX.GRAY_500};

  & > li {
    border-top: 0.0625rem solid ${COLOR.HEX.GRAY_500};
  }

  & > li:last-child {
    border-bottom: 0.0625rem solid ${COLOR.HEX.GRAY_500};
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
  display: flex;
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.25rem;
`;

export const Name = styled.span`
  font-size: 1.25rem;
  color: ${COLOR.HEX.GRAY_800};
`;

export const Quantity = styled.span`
  font-size: 1rem;
  padding-top: 1.5rem;
  color: ${COLOR.HEX.GRAY_800};
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 7.5rem;
`;
