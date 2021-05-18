import styled from 'styled-components';
import { PATTERN_FILE_NAME } from '../../../constants';

export const Container = styled.li`
  display: flex;
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 7.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.25rem;
`;

export const Name = styled.span`
  font-size: 1.25rem;
  color: #333333;
`;

export const Quantity = styled.span`
  font-size: 1rem;
  padding-top: 1.5rem;
  color: #333333;
`;
