import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Navigation = ({ navList }) => {
  return (
    <nav>
      <Styled.NavList>
        {navList.map((navItem, index) => (
          <li key={index}>
            <a href={navItem.ADDRESS}>{navItem.NAME}</a>
          </li>
        ))}
      </Styled.NavList>
    </nav>
  );
};

Navigation.propTypes = {
  navList: PropTypes.arrayOf(
    PropTypes.shape({
      NAME: PropTypes.string.isRequired,
      ADDRESS: PropTypes.string.isRequired,
    })
  ),
};

export default Navigation;
