import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, LikedProductFilter } from './ProductListPage.styles';
import { useModal } from '../../hooks';
import {
  increaseProductAmount,
  toggleLikedProductList,
  updatePageIndex,
  updateShoppingCartItemsAsync,
} from '../../redux/action';
import { ColumnProductItem, PageIndexNav } from '../../components';
import ScreenContainer from '../../styles/ScreenContainer';
import { SuccessAddedContent } from '../../components/templates';
import { numberWithCommas } from '../../utils';
import { CONTENT_PER_PAGE, ROUTE } from '../../constants';

const ProductListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { myShoppingCartId, myShoppingCartProductIds, pageIndex, productList, likedProductIdList } = useSelector(
    state => ({
      myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
      myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
      pageIndex: state.pageIndexReducer.pageIndex,
      productList: state.productListReducer.productList,
      likedProductIdList: state.likedProductIdListReducer.likedProductIdList,
    })
  );

  const [showLikedProduct, setShowLikedProduct] = useState(false);

  const { open: openModal, Modal } = useModal(false);

  const likedProductList = likedProductIdList
    .map(likedProductId => productList.find(product => likedProductId === product.id))
    .filter(product => product);

  const maxPageIndex = Math.ceil((showLikedProduct ? likedProductList : productList).length / CONTENT_PER_PAGE) - 1;

  const displayProducts = (showLikedProduct ? likedProductList : productList).slice(
    pageIndex * CONTENT_PER_PAGE,
    (pageIndex + 1) * CONTENT_PER_PAGE
  );

  const onClickShoppingCartIcon = productId => {
    if (myShoppingCartProductIds.includes(productId)) {
      dispatch(increaseProductAmount(productId));
    } else {
      const newContent = { productIdList: [...new Set([...myShoppingCartProductIds, productId])] };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    }

    openModal();
  };

  const onClickLikeButton = productId => {
    dispatch(toggleLikedProductList(productId));
  };

  const onClickNextPage = () => {
    const newPageIndex = pageIndex + 1 <= maxPageIndex ? pageIndex + 1 : pageIndex;
    dispatch(updatePageIndex(newPageIndex));
  };

  const onClickPrevPage = () => {
    const newPageIndex = pageIndex < 1 ? 0 : pageIndex - 1;
    dispatch(updatePageIndex(newPageIndex));
  };

  const onClickShowLikedProductButton = () => {
    dispatch(updatePageIndex(0));
    setShowLikedProduct(prevState => !prevState);
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Container>
        <LikedProductFilter>
          <button type="button" onClick={onClickShowLikedProductButton}>
            {showLikedProduct ? '전체 상품 보기' : '찜한 상품만 보기'}
          </button>
        </LikedProductFilter>
        {displayProducts.length === 0
          ? 'No results.'
          : displayProducts.map(({ id, img, name, price }) => (
              <ColumnProductItem
                key={id}
                imgSrc={img}
                name={name}
                isLiked={likedProductIdList.includes(id)}
                price={`${numberWithCommas(price)} 원`}
                onClickShoppingCartIcon={() => onClickShoppingCartIcon(id)}
                onClickLikeButton={() => onClickLikeButton(id)}
              />
            ))}
      </Container>

      <Modal>
        <SuccessAddedContent
          productList={likedProductList.length >= 3 ? likedProductList : productList}
          openModal={openModal}
          onClickMoveCartPageButton={() => history.push({ pathname: ROUTE.SHOPPING_CART })}
        />
      </Modal>

      <PageIndexNav
        onClickPrevPage={onClickPrevPage}
        onClickNextPage={onClickNextPage}
        pageIndex={pageIndex}
        maxPageIndex={maxPageIndex}
      />
    </ScreenContainer>
  );
};

export default ProductListPage;
