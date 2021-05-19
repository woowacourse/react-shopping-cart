import { useHistory } from 'react-router-dom';

import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useProducts from '../../hooks/useProducts';
import useSnackBar from '../../hooks/useSnackBar';
import useCart from '../../hooks/useCart';

import { PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';

import * as Styled from './ProductListPage.styles';

const ProductListPage = () => {
  const history = useHistory();
  const { products, loading, loadingError } = useProducts();
  const { addCartItem } = useCart();
  const { SnackBar, snackBarMessage, setSnackBarMessage } = useSnackBar();

  if (loading) {
    return <Loading />;
  }

  if (!loading && loadingError) {
    return <NotFound message="상품 정보를 불러올 수 없습니다." />;
  }

  const onMoveToProductDetailPage = (productId: string) => {
    history.push({ pathname: `${PATH.PRODUCT_DETAIL}/${productId}`, state: { productId } });
  };

  const onAddItemInCart = async (id: Product['productId']) => {
    const product = products.find(product => product.productId === id);

    if (!product) return;

    try {
      await addCartItem(product);
      setSnackBarMessage(`'${product.name}'이(가) 장바구니에 담겼습니다.`);
    } catch (error) {
      setSnackBarMessage(error.message);
    }
  };

  const productGridItemList = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onMoveToProductDetailPage(product.productId)}
      onClickCartButton={() => onAddItemInCart(product.productId)}
      key={product.productId}
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
