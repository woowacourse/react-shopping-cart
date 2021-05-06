import React from 'react';
import PropTypes from 'prop-types';
import { Container, Wrapper, Logo, Menu, MenuItem } from './style';
import logo from '../../assets/icons/logo.svg';

const Header = ({ menuList }) => {
  return (
    <>
      <Container>
        <Wrapper>
          <Logo src={logo} alt="WOOWA SHOP"></Logo>
          <Menu>
            {menuList.map(menu => (
              <MenuItem key={menu}>{menu}</MenuItem>
            ))}
          </Menu>
        </Wrapper>
      </Container>
    </>
  );
};

Header.propTypes = {};

export default Header;
