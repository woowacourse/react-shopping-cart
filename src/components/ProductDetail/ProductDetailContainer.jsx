import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { loadProduct } from 'store/product';

import { Flex } from 'components/shared/basics';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import SkeletonProductDetail from 'components/ProductDetail/SkeletonProductDetail';

function ProductDetailContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, product } = useSelector((state) => state.product);
  const { carts } = useSelector((state) => state.carts);

  const isStored = carts.map((cart) => cart.id).includes(id);

  useEffect(() => {
    dispatch(loadProduct(id));
  }, []);

  return (
    <Style.ProductDetailFlexContainer direction="column" align="center">
      {isLoading && <SkeletonProductDetail />}
      {!isLoading && (
        <ProductDetail
          id={id}
          src={product?.src}
          title={product?.title}
          price={product?.price}
          isStored={isStored}
        />
      )}
    </Style.ProductDetailFlexContainer>
  );
}

export default ProductDetailContainer;

const Style = {
  ProductDetailFlexContainer: styled(Flex)`
    margin-top: 50px;
  `,
};
