import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';

const Container = styled.span`
  position: relative;

  &::after {
    position: absolute;
    display: inline-block;
    content: ' ';
    width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: -1;

    height: ${({ height }) => height || '8px'};
    background-color: ${({ backgroundColor }) => backgroundColor || COLOR.MINT_500_OPACITY_50};
  }
`;

const TextHighlight = ({ children, height, backgroundColor }) => (
  <Container height={height} backgroundColor={backgroundColor}>
    {children}
  </Container>
);

TextHighlight.propTypes = {
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default TextHighlight;
