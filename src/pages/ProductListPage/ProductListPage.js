import { useHistory, useLocation } from 'react-router';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import ColumnProductItem from '../../components/ProductItem/ColumnProductItem/ColumnProductItem';
import {
  Container,
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './ProductListPage.styles';
import { ROUTE } from '../../constants';

import { useModal, useServerAPI } from '../../hooks';

const ProductListPage = () => {
  const { setModalOpen, Modal } = useModal(false);
  const { value: productList } = useServerAPI([], 'productList');
  const { value: shoppingCartList, putData: addShoppingCartItem } = useServerAPI([], 'shoppingCart');

  const history = useHistory();
  const location = useLocation();

  const onClickShoppingCartIcon = productId => {
    const content = { productIdList: [...new Set([...shoppingCartList[0].productIdList, productId])] };
    addShoppingCartItem(shoppingCartList[0].id, content);

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
        <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
        <ModalButton onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}>
          {'장바구니 바로가기 >'}
        </ModalButton>

        <RecommendedContainer>
          <RecommendedTitle>이달의 상품 TOP 3</RecommendedTitle>
          <RecommendedList>
            {productList.slice(0, 3).map(({ id, img, name, price }) => (
              <ColumnProductItem
                key={id}
                imgSrc={img}
                name={name}
                price={`${price}`}
                onClick={() => setModalOpen(true)}
                isVisibleIcon={false}
              />
            ))}
          </RecommendedList>
        </RecommendedContainer>
      </Modal>
    </ScreenContainer>
  );
};

export default ProductListPage;
