import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.flexWrap};
  flex-basis: ${(props) => props.flexBasis};
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};

  && {
    ${(props) => props.css}
  }
`;

const Flex = ({ children, ...props }) => {
  return <FlexBox {...props}>{children}</FlexBox>;
};

Flex.propTypes = {
  flexDirection: PropTypes.string,
  justifyContentContent: PropTypes.string,
  alignItems: PropTypes.string,
  flexWrap: PropTypes.string,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.string,
  flexShrink: PropTypes.string,
  css: PropTypes.array,
};

export default Flex;
