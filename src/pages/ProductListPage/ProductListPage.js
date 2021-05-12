import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PageButtonContainer, PageIndex } from './ProductListPage.styles';
import { useModal, usePaging } from '../../hooks';
import { updateShoppingCartItemsAsync } from '../../redux/action';
import { Button, ColumnProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { SuccessAddedModal } from '../../components/templates';
import { numberWithCommas } from '../../shared/utils';
import { ModalPortal } from '../../portals';

const ProductListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { myShoppingCartId, myShoppingCartProductIds } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
  }));

  const { productList } = useSelector(state => ({
    productList: state.productListReducer.productList,
  }));

  const { open: openModal, Modal } = useModal(false);

  const {
    currentPageIndex: currentPage,
    maxPageIndex,
    onClickNext: onClickNextPage,
    onClickPrev: onClickPrevPage,
    displayContents: displayProducts,
  } = usePaging({
    initPageIndex: 0,
    contents: productList,
    contentsPerPage: 10,
  });

  const onClickShoppingCartIcon = productId => {
    const newContent = { productIdList: [...new Set([...myShoppingCartProductIds, productId])] };
    dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));

    openModal();
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
          <SuccessAddedModal productList={productList} openModal={openModal} />
        </Modal>
      </ModalPortal>
      <PageButtonContainer>
        <Button onClick={onClickPrevPage} disabled={currentPage === 0}>
          이전
        </Button>
        <PageIndex>{currentPage + 1}</PageIndex>
        <Button onClick={onClickNextPage} disabled={currentPage === maxPageIndex}>
          다음
        </Button>
      </PageButtonContainer>
    </ScreenContainer>
  );
};

export default ProductListPage;
