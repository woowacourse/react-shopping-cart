import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';
import WithSpinner from 'components/@shared/WithSpinner/WithSpinner';

import AllSelectButton from 'components/AllSelectCheckbox/AllSelectCheckbox';
import ProductDeleteButton from 'components/ProductDeleteButton/ProductDeleteButton';
import ShoppingCartItemGroup from 'components/ShoppingCartItemGroup/ShoppingCartItemGroup';

import {
  deleteCheckedProductsStart,
  fetchCartsStart,
} from 'redux/carts/carts.action';
import {
  selectCartsLoading,
  selectCurrentCarts,
} from 'redux/carts/carts.selector';

import { CURRENT_USER } from 'constants';

//재사용X
function CartLeftSection() {
  const dispatch = useDispatch();
  const carts = useSelector(selectCurrentCarts);
  const cartLoading = useSelector(selectCartsLoading);
  const myCarts = carts.filter((cart) => cart.user === CURRENT_USER);
  const checkedIdList = myCarts
    .filter((cart) => cart['checked'])
    .map((cart) => cart.id);

  const handleDeleteCheckedProducts = () => {
    if (window.confirm('선택하신 상품(들)을 삭제하시겠습니까?')) {
      dispatch(deleteCheckedProductsStart(checkedIdList));
    }
  };

  useEffect(() => {
    dispatch(fetchCartsStart());
  }, [dispatch]);

  return (
    <FlexWrapper flexDirection="column" width="490px">
      <Styled.CartLeftSectionHeader>
        <AllSelectButton carts={myCarts} />
        <ProductDeleteButton onClick={handleDeleteCheckedProducts}>
          상품삭제
        </ProductDeleteButton>
      </Styled.CartLeftSectionHeader>
      <Styled.CartItemsContainer>
        <Styled.CartItemsContainerHeader>{`든든배송상품 ${myCarts.length}개`}</Styled.CartItemsContainerHeader>
        <WithSpinner loading={cartLoading}>
          <ShoppingCartItemGroup carts={myCarts} />
        </WithSpinner>
      </Styled.CartItemsContainer>
    </FlexWrapper>
  );
}

const Styled = {
  CartItemsContainer: styled.div`
    width: inherit;
  `,
  CartLeftSectionHeader: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,

  CartItemsContainerHeader: styled.div`
    font-size: 13px;
    width: 100%;
    padding: 20px 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray_01};
  `,
};

export default CartLeftSection;
