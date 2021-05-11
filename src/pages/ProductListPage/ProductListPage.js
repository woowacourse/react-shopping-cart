/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from './ProductListPage.styles';
import { SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import { updateShoppingCartItemsAsync } from '../../redux/action';
import { ColumnProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { SuccessAddedModal } from '../../components/templates';
import { numberWithCommas } from '../../shared/utils';

const ProductListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { myShoppingCartId, myShoppingCartProductIds } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
  }));

  const { setModalOpen, Modal } = useModal(false);
  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);

  const onClickShoppingCartIcon = productId => {
    const newContent = { productIdList: [...new Set([...myShoppingCartProductIds, productId])] };
    dispatch(updateShoppingCartItemsAsync(SCHEMA.SHOPPING_CART, myShoppingCartId, newContent));

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
            price={`${numberWithCommas(price)} 원`}
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
