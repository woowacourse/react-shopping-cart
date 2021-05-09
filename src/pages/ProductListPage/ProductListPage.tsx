import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../modules/product';
import { RootState } from '../../modules';
import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import loadingSVG from '../../assets/svgs/loading.svg';
import { PATH } from '../../constants';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const onProductItemClick = (event: React.MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }
    const productId = event.target.id;
    history.push(PATH.PRODUCT_DETAIL, productId);
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={onProductItemClick}
      id={product.id}
      key={product.id}
      name={product.name}
      price={product.price}
      thumbnail={product.thumbnail}
    />
  ));

  return (
    <>
      {loading && (
        <Styled.LoadingWrapper>
          <img src={loadingSVG} alt="로딩 중" />
          {!loading && products?.length === 0 && <h1>등록된 상품이 없습니다</h1>}
        </Styled.LoadingWrapper>
      )}
      <Styled.ProductListPage>{productGridItemList}</Styled.ProductListPage>
    </>
  );
};

export default ProductListPage;
