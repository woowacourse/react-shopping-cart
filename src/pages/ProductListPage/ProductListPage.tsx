import axios from 'axios';
import { useEffect, useState } from 'react';

import { STATUS_CODE, URL } from '../../constants';
import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL.PRODUCTS);

        if (response.status !== STATUS_CODE.GET_SUCCESS) {
          throw new Error('Fail to get products');
        }

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem key={product.id} name={product.name} price={product.price} thumbnail={product.thumbnail} />
  ));

  return <Styled.ProductListPage>{productGridItemList}</Styled.ProductListPage>;
};

export default ProductListPage;
