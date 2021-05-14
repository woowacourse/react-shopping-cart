import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.gridColumnRepeatCount}, ${props.gridColumnWidth})`};
  grid-column-gap: ${(props) => props.gridColumnGap};
  grid-row-gap: ${(props) => props.gridRowGap};
`;

const GridColumnList = ({ children, ...props }) => {
  return <ProductList {...props}>{children}</ProductList>;
};

GridColumnList.propTypes = {
  gridColumnRepeatCount: PropTypes.number,
  gridColumnWidth: PropTypes.string,
  gridColumnGap: PropTypes.string,
  gridRowGap: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default GridColumnList;
