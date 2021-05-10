import React from 'react';
import PropTypes from 'prop-types';
import { Container, Wrapper } from './style';

const Header = ({ children }) => {
  return (
    <>
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
    </>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
