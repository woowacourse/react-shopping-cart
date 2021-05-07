import styled from 'styled-components';
import { PATTERN_FILE_NAME } from '../../../../constants';

export const Container = styled.li`
  padding: 1.5rem 0.25rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

export const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 9rem;
`;

export const Name = styled.span`
  flex-grow: 1;
  padding-left: 1.25rem;
  font-size: 1.25rem;
  color: #333333;
`;

export const Controller = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`;

export const Price = styled.span`
  font-size: 1rem;
  color: #333333;
  text-align: right;
`;
