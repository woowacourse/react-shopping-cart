import React from 'react';

import Wrapper from './style';

const Header = () => {
  return (
    <Wrapper>
      <div className="home flex-row">
        <img src="/img/shopping-cart-white.png" alt="home-button" />

        <button>WOOWA SHOP</button>
      </div>
      <div className="nav flex-row">
        <button>장바구니</button>
        <button>주문목록</button>
      </div>
    </Wrapper>
  );
};

export default Header;
