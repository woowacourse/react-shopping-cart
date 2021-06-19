import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Navigation = ({ navList }) => {
  return (
    <nav>
      <Styled.NavList>
        {navList.map(({ name, address }, index) => (
          <li key={index}>
            <Link to={`${address}`}>{name}</Link>
          </li>
        ))}
      </Styled.NavList>
    </nav>
  );
};

Navigation.propTypes = {
  navList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ),
};

export default Navigation;
