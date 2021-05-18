import styled from 'styled-components';
import { Button } from '../../../components';
import { PATTERN_FILE_NAME, BAEMIN_CYAN } from '../../../constants';

export const Container = styled.li`
  display: flex;
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 8.75rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 1.25rem;
`;

export const Name = styled.span`
  font-size: 1.25rem;
  color: #333333;
`;

export const OrderSummary = styled.span`
  font-size: 1rem;
  padding-top: 1.5rem;
  color: #888888;
`;

export const AddToCartButton = styled(Button)`
  font-size: 1.25rem;
  background-color: ${BAEMIN_CYAN};
  color: #ffffff;
  width: 8.625rem;
  height: 3rem;
`;
