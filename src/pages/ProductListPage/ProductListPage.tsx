import { useHistory } from 'react-router-dom';

import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useProducts from '../../hooks/useProducts';
import useSnackBar from '../../hooks/useSnackBar';

import { PATH, RESPONSE_RESULT } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { API } from '../../services/api';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const history = useHistory();
  const { products, loading, error } = useProducts();
  const { SnackBar, snackBarMessage, setSnackBarMessage } = useSnackBar();

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
      setSnackBarMessage('상품이 이미 장바구니에 담겨있습니다.');
      return;
    }

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      setSnackBarMessage('상품을 장바구니에 담지 못했습니다.');
      return;
    }

    setSnackBarMessage(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onMoveToProductDetailPage(product.id)}
      onClickCartButton={() => onAddItemInCart(product.id)}
      key={product.id}
      name={product.name}
      price={getMoneyString(product.price)}
      thumbnail={product.thumbnail}
    />
  ));

  return (
    <Styled.ProductListPage>
      {productGridItemList}
      <SnackBar key={Math.random()} message={snackBarMessage} setMessage={setSnackBarMessage} />
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
