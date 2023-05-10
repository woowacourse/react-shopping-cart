import dataList from '../../api/mockData.json';
import { preprocessor } from '../../api/preprocessor';

import * as Styled from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';

const ProductList = () => {
  const productDataList = preprocessor(dataList);

  return (
    <Styled.ProductList>
      {productDataList.map(productData => (
        <ProductItem key={productData.id} product={{ ...productData }} />
      ))}
    </Styled.ProductList>
  );
};

export default ProductList;
