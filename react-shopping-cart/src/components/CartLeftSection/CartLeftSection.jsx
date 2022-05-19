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
  const carts = useSelector(selectCurrentCarts);
  const dispatch = useDispatch();
  const myCarts = carts.filter((cart) => cart.user === CURRENT_USER);
  const cartLoading = useSelector(selectCartsLoading);
  const checkedIdList = myCarts
    .filter((cart) => cart['checked'])
    .map((cart) => cart.id);

  const handleDeleteCheckedProducts = () => {
    dispatch(deleteCheckedProductsStart(checkedIdList));
  };

  useEffect(() => {
    dispatch(fetchCartsStart());
  }, [dispatch]);

  return (
    <FlexWrapper flexDirection="column" width="490px">
      <CartLeftSectionHeader>
        <AllSelectButton />
        <ProductDeleteButton onClick={handleDeleteCheckedProducts}>
          상품삭제
        </ProductDeleteButton>
      </CartLeftSectionHeader>
      {/* TODO: inline style 빼기 */}
      <div style={{ width: 'inherit' }}>
        <CartItemsContainerHeader>{`든든배송상품 ${myCarts.length}개`}</CartItemsContainerHeader>
        <WithSpinner loading={cartLoading}>
          <ShoppingCartItemGroup carts={myCarts} />
        </WithSpinner>
      </div>
    </FlexWrapper>
  );
}

const CartLeftSectionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CartItemsContainerHeader = styled.div`
  font-size: 13px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray_01};
`;

export default CartLeftSection;
