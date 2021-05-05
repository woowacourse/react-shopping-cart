import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Header = ({ logo, title, children }) => {
  return (
    <Styled.Header>
      <Styled.HeaderInner>
        <Styled.HeaderTitle>
          <span>{logo}</span>
          {title}
        </Styled.HeaderTitle>
        {children}
      </Styled.HeaderInner>
    </Styled.Header>
  );
};

Header.propTypes = {
  logo: PropTypes.elementType,
  title: PropTypes.string,
  children: PropTypes.elementType,
};

Header.defaultProps = {
  logo: null,
  title: '',
};

export default Header;
