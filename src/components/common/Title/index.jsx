import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    text-align: center;
  `,
  Title: styled.h1`
    position: relative;
    width: 100%;

    text-align: center;
    font-size: 32px;
    font-weight: 700;

    :after {
      content: '';
      position: absolute;
      left: 0px;
      bottom: -25px;
      height: 2px;
      width: 100%;
      background: #111;
    }
  `,
};

const Title = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{children}</Styled.Title>
    </Styled.Wrapper>
  );
};

Title.propTypes = {
  children: PropTypes.string,
};

export default Title;
