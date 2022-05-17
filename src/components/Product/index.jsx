import React from 'react';

import Wrapper from './style';

const Product = ({ imgSrc, title, price }) => {
  return (
    <Wrapper>
      <img className="thumbnail" src={imgSrc} alt={`${title} 상품`} />
      <div className="bottom flex-row">
        <div>
          <p className="title">{title}</p>
          <p className="price">{price.toLocaleString()}</p>
        </div>
        <img src="/img/shopping-cart-black.png" alt="장바구니" />
      </div>
    </Wrapper>
  );
};

export default Product;
