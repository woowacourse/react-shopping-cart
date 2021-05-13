import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PageButtonContainer, PageIndex } from './ProductListPage.styles';
import { useModal } from '../../hooks';
import { increaseProductAmount, updatePageIndex, updateShoppingCartItemsAsync } from '../../redux/action';
import { Button, ColumnProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { SuccessAddedModal } from '../../components/templates';
import { numberWithCommas } from '../../shared/utils';
import { ModalPortal } from '../../portals';
import { CONTENT_PER_PAGE, ROUTE } from '../../constants';

const ProductListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { myShoppingCartId, myShoppingCartProductIds, pageIndex, productList } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
    pageIndex: state.pageIndexReducer.pageIndex,
    productList: state.productListReducer.productList,
  }));

  const { open: openModal, Modal } = useModal(false);

  const displayProducts = productList.slice(pageIndex * CONTENT_PER_PAGE, (pageIndex + 1) * CONTENT_PER_PAGE);
  const maxPageIndex = Math.ceil(productList.length / CONTENT_PER_PAGE) - 1;

  const onClickShoppingCartIcon = productId => {
    if (myShoppingCartProductIds.includes(productId)) {
      dispatch(increaseProductAmount(productId));
    } else {
      const newContent = { productIdList: [...new Set([...myShoppingCartProductIds, productId])] };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    }

    openModal();
  };

  const onClickNextPage = () => {
    const newPageIndex = pageIndex + 1 <= maxPageIndex ? pageIndex + 1 : pageIndex;
    dispatch(updatePageIndex(newPageIndex));
  };

  const onClickPrevPage = () => {
    const newPageIndex = pageIndex < 1 ? 0 : pageIndex - 1;
    dispatch(updatePageIndex(newPageIndex));
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Container>
        {displayProducts.map(({ id, img, name, price }) => (
          <ColumnProductItem
            key={id}
            imgSrc={img}
            name={name}
            price={`${numberWithCommas(price)} 원`}
            onClickShoppingCartIcon={() => onClickShoppingCartIcon(id)}
          />
        ))}
      </Container>

      <ModalPortal>
        <Modal>
          <SuccessAddedModal
            productList={productList}
            openModal={openModal}
            onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}
          />
        </Modal>
      </ModalPortal>
      <PageButtonContainer>
        <Button onClick={onClickPrevPage} disabled={pageIndex === 0}>
          이전
        </Button>
        <PageIndex>{pageIndex + 1}</PageIndex>
        <Button onClick={onClickNextPage} disabled={pageIndex === maxPageIndex}>
          다음
        </Button>
      </PageButtonContainer>
    </ScreenContainer>
  );
};

export default ProductListPage;
