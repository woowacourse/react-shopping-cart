import { useLocation } from 'react-router';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import ColumnProductItem from '../../components/ProductItem/ColumnProductItem/ColumnProductItem';
import { Container } from './ProductListPage.styles';
import { CUSTOMER_ID, SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import SuccessAddedModal from '../../components/Modal/SuccessAddedModal/SuccessAddedModal';

const ProductListPage = () => {
  const { setModalOpen, Modal } = useModal(false);
  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);
  const { value: shoppingCartList, putData: addShoppingCartItem } = useServerAPI([], SCHEMA.SHOPPING_CART);

  const location = useLocation();

  const onClickShoppingCartIcon = productId => {
    const content = {
      productIdList: [...new Set([...shoppingCartList[CUSTOMER_ID].productIdList, productId])],
    };
    addShoppingCartItem(shoppingCartList[CUSTOMER_ID].id, content);

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
