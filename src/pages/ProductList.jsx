import React from 'react';
import ProductImage, { SIZE } from '../components/productImage/ProductImage';

const ProductList = () => {
  return (
    <ul>
      <li>
        <ProductImage
          size={SIZE.MEDIUM}
          src="https://user-images.githubusercontent.com/40762111/117096676-c9fd6200-ada4-11eb-9ccb-8bd52ec86210.png"
          alt="PET보틀-정사각(420ml)"
        />
      </li>
    </ul>
  );
};

export default ProductList;
