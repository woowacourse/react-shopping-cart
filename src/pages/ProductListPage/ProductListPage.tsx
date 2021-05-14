import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import SnackBar from '../../components/commons/SnackBar/SnackBar';

import useProducts from '../../hooks/products';

import { PATH, RESPONSE_RESULT } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { API } from '../../services/api';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const history = useHistory();
  const { products, loading, error } = useProducts();
  const [isSnackBarShown, setSnackBarShown] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (!loading && error) {
    return <NotFound message="상품 정보를 불러올 수 없습니다." />;
  }

  const onMoveToProductDetailPage = (productId: string) => {
    history.push({ pathname: `${PATH.PRODUCT_DETAIL}/${productId}`, state: { productId } });
  };

  const onAddItemInCart = async (id: Product['id']) => {
    const product = products.find(product => product.id === id);

    if (!product) return;

    const responseResult = await API.ADD_ONE_ITEM_IN_CART(product);

    if (responseResult === RESPONSE_RESULT.ALREADY_EXIST) {
      alert(`'${product?.name}'이(가) 이미 장바구니에 존재합니다.`);
      return;
    }

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      alert('상품을 장바구니에 담지 못했습니다.');
      return;
    }

    alert(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onMoveToProductDetailPage(product.id)}
      onCartButtonClick={() => onAddItemInCart(product.id)}
      key={product.id}
      name={product.name}
      price={getMoneyString(product.price)}
      thumbnail={product.thumbnail}
    />
  ));

  return (
    <Styled.ProductListPage>
      {productGridItemList}
      <SnackBar message="이미 추가된 상품입니다." />
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
