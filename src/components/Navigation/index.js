import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Styled from './style';

const Navigation = ({ navList }) => {
  return (
    <nav>
      <Styled.NavList>
        {navList.map((navItem, index) => (
          <li key={index}>
            <Link to={`${navItem.ADDRESS}`}>{navItem.NAME}</Link>
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
