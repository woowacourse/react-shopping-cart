import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:focus {
    outline: none;
  }

  && {
    ${(props) => props.css}
  }
`;

const IconButton = (props) => {
  const { type, src, alt, width, height, css, onClick } = props;

  return (
    <ButtonWrapper type={type} width={width} height={height} css={css} onClick={onClick}>
      <img src={src} alt={alt} />
    </ButtonWrapper>
  );
};

IconButton.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  css: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
