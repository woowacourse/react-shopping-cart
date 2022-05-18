import React, { useState, useCallback } from 'react';

import Wrapper from './style';

const Product = ({ imgSrc, title, price }) => {
  const [showQuantity, setShowQuantity] = useState(false);

  const handleClickCartImage = useCallback(() => {
    setShowQuantity(!showQuantity);
  }, [showQuantity]);

  return (
    <Wrapper showQuantity={showQuantity}>
      <img className="thumbnail" src={imgSrc} alt={`${title} 상품`} />
      <div className="bottom flex-row-space-between">
        <div>
          <p className="title">{title}</p>
          <p className="price">{price.toLocaleString()}</p>
        </div>
        <div className="circle minus">
          <p>-</p>
        </div>
        <div className="circle quantity">
          <p>1</p>
        </div>
        <div className="circle plus">
          <p>+</p>
        </div>
        <div className="img-wrapper" onClick={handleClickCartImage}>
          <img src="/img/shopping-cart-black.png" alt="장바구니" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Product;
