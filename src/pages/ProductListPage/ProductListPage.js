import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container } from './ProductListPage.styles';
import { ROUTE } from '../../constants';
import { useModal, useFetch } from '../../hooks';
import { ColumnProductItem, SuccessAddedModal, ErrorMessage } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { addShoppingCartItemAsync } from '../../redux/slice';
import { requestProductList } from '../../service/product';

const ProductListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setModalOpen, Modal } = useModal(false);
  const [productList, getProductListError] = useFetch([], requestProductList);

  const addShoppingCartItem = productId => {
    dispatch(addShoppingCartItemAsync({ product_id: productId }));

    setModalOpen(true);
  };

  const goProductDetail = productId => {
    history.push({
      pathname: `${ROUTE.PRODUCT_DETAIL}/${productId}`,
    });
  };

  return (
    <ScreenContainer route={location.pathname}>
      {getProductListError ? (
        <ErrorMessage>상품 목록을 불러올 수 없습니다 😞</ErrorMessage>
      ) : (
        <Container>
          {productList?.map(({ product_id: productId, image_url: imageUrl, name, price }) => (
            <ColumnProductItem
              key={productId}
              imgSrc={imageUrl}
              name={name}
              price={price}
              onClickShoppingCartIcon={() => addShoppingCartItem(productId)}
              onClickImage={() => goProductDetail(productId)}
            />
          ))}
        </Container>
      )}
      <Modal>
        <SuccessAddedModal productList={productList} setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default ProductListPage;
