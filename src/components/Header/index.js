import PropTypes from 'prop-types';
import React from 'react';
import * as Styled from './style';

const Header = ({ logo, title, homeAddress, children }) => {
  return (
    <Styled.Header>
      <Styled.HeaderInner>
        <Styled.HeaderTitle src={homeAddress}>
          <span>{logo}</span>
          <h1>{title}</h1>
        </Styled.HeaderTitle>
        {children}
      </Styled.HeaderInner>
    </Styled.Header>
  );
};

Header.propTypes = {
  logo: PropTypes.element,
  title: PropTypes.string,
  homeAddress: PropTypes.string,
  children: PropTypes.element,
};

Header.defaultProps = {
  logo: null,
  title: '',
  homeAddress: '/',
};

export default Header;
