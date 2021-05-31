import { useHistory } from 'react-router-dom';

import ProductGridItem from '../../components/ProductListPage/ProductGridItem/ProductGridItem';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

import useProducts from '../../hooks/useProducts';

import { PATH } from '../../constants';
import { getMoneyString } from '../../utils/format';

import * as Styled from './ProductListPage.styles';
import { Product } from '../../type';
import useSnackbar from '../../hooks/layout/useSnackbar';
import useCart from '../../hooks/useCart';
import usePagination from '../../hooks/layout/usePagination';
import { ITEM_SLICE_UNIT } from '../../constants/layout';
import { TEST_ID } from '../../constants/test';

const ProductListPage = () => {
  const history = useHistory();
  const { products, loading, responseOK, addProductToCart } = useProducts();
  const { fetchCartItems, isCartHasProduct } = useCart();
  const { showSnackbar, SnackbarContainer } = useSnackbar();
  const { sliceItems, PaginationContainer } = usePagination(products.length, ITEM_SLICE_UNIT);

  const onProductItemClick = (productId: string) => {
    history.push({ pathname: `${PATH.PRODUCT_DETAIL}/${productId}`, state: { productId } });
  };

  const onCartButtonClick = async (id: Product['id']) => {
    const product = products.find(product => product.id === id);
    if (!product) {
      return;
    }

    if (isCartHasProduct(product.name)) {
      showSnackbar(`'${product.name}'은(는) 이미 장바구니에 담긴 상품입니다`);
      return;
    }

    try {
      await addProductToCart(product.id);
      await fetchCartItems();
      showSnackbar(`'${product?.name}'을(를) 장바구니에 담았습니다.`);
    } catch (error) {
      showSnackbar(error.message);
      console.error(error);
    }
  };

  const productGridItems = products.map((product: Product) => (
    <ProductGridItem
      onClick={() => onProductItemClick(product.id)}
      onCartButtonClick={() => onCartButtonClick(product.id)}
      key={product.id}
      name={product.name}
      price={getMoneyString(product.price)}
      thumbnail={product.thumbnail}
    />
  ));

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="상품 정보를 불러올 수 없습니다." />;
  }

  return (
    <Styled.ProductListPage data-testid={TEST_ID.PRODUCT_LIST_PAGE}>
      <Styled.ProductItemsGrid>{sliceItems(productGridItems)}</Styled.ProductItemsGrid>
      <Styled.PaginationWrapper>
        <PaginationContainer />
      </Styled.PaginationWrapper>
      <SnackbarContainer />
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
