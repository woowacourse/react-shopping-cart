import * as Styled from './ProductList.styled';
import dataList from '../../api/mockData.json';
import ProductItem from '../ProductItem/ProductItem';

const ProductList = () => {
  return (
    <Styled.ProductList>
      {dataList.map(data => (
        <ProductItem key={data.id} product={{ ...data }} />
      ))}
    </Styled.ProductList>
  );
};

export default ProductList;
