import React from 'react';
import PropTypes from 'prop-types';

import { printCommasToPrice } from '../../utils';

import styled from 'styled-components';

const ProductPrice = styled.span`
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};

  && {
    ${(props) => props.css}
  }
`;

const PriceText = ({ children, ...props }) => {
  return <ProductPrice {...props}>{printCommasToPrice(children)}원</ProductPrice>;
};

PriceText.propTypes = {
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
  fontWeight: PropTypes.number,
  color: PropTypes.string,
  css: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

PriceText.defaultProps = {
  fontWeight: 400,
  color: '#333333',
};

export default PriceText;
