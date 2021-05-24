import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container } from './ProductListPage.styles';
import { ROUTE } from '../../constants';
import { useModal, useFetch } from '../../hooks';
import { ColumnProductItem, SuccessAddedModal } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { addShoppingCartItemAsync } from '../../redux/slice';
import { requestProductList } from '../../service/product';

const ProductListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setModalOpen, Modal } = useModal(false);
  const { data: productList, isError } = useFetch([], requestProductList);

  useEffect(() => {
    if (!isError) return;

    alert(`${isError} Error`);
  }, [isError]);

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
      <Container>
        {productList.map(({ product_id: productId, image_url: imageUrl, name, price }) => (
          <ColumnProductItem
            key={productId}
            imgSrc={imageUrl}
            name={name}
            price={`${price}`}
            onClickShoppingCartIcon={() => addShoppingCartItem(productId)}
            onClickImage={() => goProductDetail(productId)}
          />
        ))}
      </Container>

      <Modal>
        <SuccessAddedModal productList={productList} setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default ProductListPage;
