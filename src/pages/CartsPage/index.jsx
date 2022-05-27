import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubTitle from 'styles/SubTitle';

import CheckBox from 'components/CheckBox';
import Cart from 'components/Cart';
import PayAmount from 'components/PayAmount';

import Skeleton from 'skeletons/CartSkeleton';

import Wrapper from './style';

import { getCarts, selectAllCart, clearAllCart, deleteSeveralCarts } from 'reducers/carts';
import { deleteCarts } from 'reducers/addUpdateDeleteCart';
import { onMessage } from 'reducers/snackbar';

import { SNACKBAR_MESSAGE } from 'constants';

const CartsPage = () => {
  const dispatch = useDispatch();
  const { loading, data: carts } = useSelector((state) => state.carts);

  const selectedCartTotalPrice = useMemo(
    () =>
      carts
        .filter(({ selected }) => selected)
        .reduce((acc, { price, quantity }) => acc + price * quantity, 0),
    [carts],
  );
  const selectedCartCount = useMemo(() => carts.filter(({ selected }) => selected).length, [carts]);
  const isAllSelectedCarts = useMemo(
    () => carts.length && carts.every(({ selected }) => selected),
    [carts],
  );

  const handleChangeCheckBox = useCallback(() => {
    dispatch(isAllSelectedCarts ? clearAllCart() : selectAllCart());
  }, [dispatch, isAllSelectedCarts]);

  const handleClickAllDeleteButton = useCallback(async () => {
    const ids = carts.filter(({ selected }) => selected).map(({ id }) => id);

    await dispatch(deleteCarts(ids)).unwrap();
    dispatch(deleteSeveralCarts(ids));
    dispatch(onMessage(SNACKBAR_MESSAGE.deletesProduct()));
  }, [dispatch, carts]);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  return (
    <Wrapper>
      <SubTitle>장바구니</SubTitle>
      <div className="wrapper">
        <div className="left">
          <div className="header flex-row-space-between">
            <div className="checkbox-wrapper">
              <CheckBox
                id="all-check"
                checked={isAllSelectedCarts}
                onChange={handleChangeCheckBox}
              />
              <p>선택해제</p>
            </div>
            <button type="button" onClick={handleClickAllDeleteButton}>
              상품삭제
            </button>
          </div>

          <h3 className="title">든든 상품 배송 ({carts.length}개)</h3>

          <div className="container">
            {loading && (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
            {loading || carts.map((cart) => <Cart key={cart.id} {...cart} />)}
          </div>
        </div>
        <div className="right">
          <PayAmount
            title="결제예상금액"
            amount={selectedCartTotalPrice}
            buttonText={`주문하기(${selectedCartCount}개)`}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default CartsPage;
