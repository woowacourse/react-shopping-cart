import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

/**
 * 그리드 간격은 가로 64px, 세로 16px 입니다.
 */
const Grid = ({ col = 1, children, columnGap = '64px', rowGap = '16px' }) => {
  return (
    <Container col={col} columnGap={columnGap} rowGap={rowGap}>
      {children}
    </Container>
  );
};

Grid.propTypes = {
  col: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  columnGap: PropTypes.string,
  rowGap: PropTypes.string,
};

export default Grid;
