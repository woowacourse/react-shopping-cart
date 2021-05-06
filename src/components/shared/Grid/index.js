import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

/**
 * 그리드 간격은 가로 64px, 세로 16px 입니다.
 */
const Grid = ({ col, children }) => {
  return <Container col={col}>{children}</Container>;
};

Grid.propTypes = {
  col: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Grid;
