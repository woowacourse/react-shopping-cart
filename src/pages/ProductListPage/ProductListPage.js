/* eslint-disable no-unused-vars */
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container } from './ProductListPage.styles';
import { ROUTE, SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/action';
import { ColumnProductItem, SuccessAddedModal } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';

const ProductListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setModalOpen, Modal } = useModal(false);
  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);

  const onClickShoppingCartIcon = productId => {
    dispatch(addShoppingCartItemAsync(productId));

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
        {productList.map(({ id, img, name, price }) => (
          <ColumnProductItem
            key={id}
            imgSrc={img}
            name={name}
            price={`${price}`}
            onClickShoppingCartIcon={() => onClickShoppingCartIcon(id)}
            onClickImage={() => goProductDetail(id)}
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
