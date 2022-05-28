import styled from 'styled-components';

import CartItem from 'components/CartsList/CartItem';
import SkeletonCartItem from 'components/CartsList/SkeletonCartItem';
import { useSelector } from 'react-redux';
import { findByIdInObjectArray, isContainedInObjectArray } from 'utils';
import CheckedItemsController from 'components/CheckBox/CheckedItemsController';
import { BasicDivideLine, Flex } from 'components/shared/basics';
import TotalPrice from 'components/TotalPrice/TotalPrice';

function CartListContainer() {
  const { carts, checkedCarts } = useSelector((state) => state.carts);
  const { isLoading, products } = useSelector((state) => state.products);

  const storedProducts = carts
    .map((cart) => cart.id)
    .map((id) => ({
      ...findByIdInObjectArray(products, id),
      quantity: findByIdInObjectArray(carts, id).quantity,
      isStored: isContainedInObjectArray(checkedCarts, id),
    }));
  const checkedProducts = checkedCarts
    .map((cart) => cart.id)
    .map((id) => ({
      ...findByIdInObjectArray(products, id),
      quantity: findByIdInObjectArray(carts, id).quantity,
    }));

  const totalPrice = Number(
    checkedProducts?.reduce((acc, cur) => acc + +cur.price * +cur.quantity, 0)
  );

  const totalQuantity = Number(
    checkedProducts?.reduce((acc, cur) => acc + +cur.quantity, 0)
  );

  const allChecked = carts.length === checkedCarts.length;

  return (
    <div>
      <Style.CartListContainer justify="space-between">
        <Style.CartListWrapper>
          <CheckedItemsController
            allChecked={allChecked}
            checkedCarts={checkedCarts}
          />
          <span>든든배송 상품 {totalQuantity}개</span>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />

          {isLoading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCartItem key={idx} />
            ))}
          {!isLoading &&
            storedProducts?.map((product) => (
              <CartItem key={product.id} {...product} />
            ))}
        </Style.CartListWrapper>

        <TotalPrice
          total={isNaN(totalPrice) ? '0' : totalPrice.toLocaleString('ko-kr')}
          quantity={totalQuantity}
        />
      </Style.CartListContainer>
    </div>
  );
}

export default CartListContainer;

const Style = {
  CartListContainer: styled(Flex)`
    padding: 0 20px;
  `,
  CartListWrapper: styled.div`
    width: 60%;
  `,
};
