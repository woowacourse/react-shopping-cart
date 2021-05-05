import React from 'react';
import { Container } from './style';

/**
 * 그리드 간격은 가로 64px, 세로 16px 입니다.
 */
const Grid = ({ col, children }) => {
  return <Container col={col}>{children}</Container>;
};

export default Grid;
