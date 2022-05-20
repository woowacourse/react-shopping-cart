import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './style';

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">
        <div className="home flex-row">
          <img src="/img/shopping-cart-white.png" alt="home-button" />

          <button>WOOWA SHOP</button>
        </div>
      </Link>
      <div className="nav flex-row">
        <Link to="/carts">
          <button>장바구니</button>
        </Link>
        <button>주문목록</button>
      </div>
    </Wrapper>
  );
};

export default Header;
