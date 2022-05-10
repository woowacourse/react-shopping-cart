import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = {
  Button: styled.button`
    border: none;
    background: none;
    cursor: pointer;
  `,
};

const Button = () => {
  return <Styled.Button>test</Styled.Button>;
};

export default Button;
