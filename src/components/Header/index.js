import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Styled from './style';

const Header = ({ logo, title, children }) => {
  return (
    <Styled.Header>
      <Styled.HeaderInner>
        <Link to="/">
          <Styled.HeaderTitle>
            <span>{logo}</span>
            <h1>{title}</h1>
          </Styled.HeaderTitle>
        </Link>
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
