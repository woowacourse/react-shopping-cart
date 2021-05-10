import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import ColumnProductItem from '../../components/ProductItem/ColumnProductItem/ColumnProductItem';
import { Container } from './ProductListPage.styles';
import { SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import SuccessAddedModal from '../../components/Modal/SuccessAddedModal/SuccessAddedModal';
import { addShoppingCartItem } from '../../redux/action';

const ProductListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { setModalOpen, Modal } = useModal(false);
  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);

  const onClickShoppingCartIcon = productId => {
    dispatch(addShoppingCartItem(productId));

    setModalOpen(true);
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
