import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import emptyCart from '../assets/empty-cart.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  deleteCheckedShoppingCartList,
  getShoppingCartList,
  toggleAllShoppingCartItem,
} from '../redux/actions/shoppingCartActions';
import useDialog from '../hooks/useDialog';
import { PATH } from '../constants/path';
import {
  Button,
  Checkbox,
  PageTitle,
  PaymentAmount,
  SelectedProductList,
  ShoppingCartItem,
  Dialog,
  Loading,
  DIALOG_TYPE,
  SELECTED_PRODUCT_LIST_TYPE,
  PAYMENT_AMOUNT_TYPE,
  BUTTON_TYPE,
} from '../components';

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const EmptyCartImage = styled.img`
  width: 50%;
`;

const EmptyCartText = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;

const Content = styled.section`
  position: relative;
  display: flex;
  padding: 0 18px;
  gap: 100px;
`;

const ShoppingCartItemModification = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const PaymentAmountWrapper = styled.div`
  position: sticky;
  margin-top: 50px;
  top: 50px;
`;

const Text = styled.span`
  margin-left: 12px;
`;

const getExpectedPaymentAmount = (checkedShoppingCartList) =>
  checkedShoppingCartList.reduce((acc, cur) => acc + cur.price * cur.count, 0);

const ShoppingCart = () => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel } = useDialog();
  const [isInitLoading, setInitLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.shoppingCart.isAllShoppingCartItemChecked);
  const { isLoading: isDataLoading, data: shoppingCartList } = useSelector(
    (state) => state.shoppingCart.shoppingCartList
  );

  const checkedShoppingCartList = shoppingCartList.filter((item) => item.isChecked);
  const checkedCount = checkedShoppingCartList.length;

  const totalPrice = getExpectedPaymentAmount(checkedShoppingCartList);

  useEffect(() => {
    (async () => {
      await dispatch(getShoppingCartList());
      setInitLoading(false);
    })();
  }, [dispatch]);

  const handleAllShoppingCartItemToggle = () => {
    dispatch(toggleAllShoppingCartItem());
  };

  const handleConfirm = () => {
    clickConfirm(() => dispatch(deleteCheckedShoppingCartList(checkedShoppingCartList)));
  };

  const handleCancel = () => {
    clickCancel();
  };

  const handleCheckedShoppingCartListDelete = () => {
    setIsDialogOpen(true);
  };

  const handleOrderPaymentPageRouter = () => {
    if (!checkedCount) return;

    history.push(PATH.ORDER_PAYMENT, {
      orderPaymentList: checkedShoppingCartList,
      totalPrice,
    });
  };

  if (isDataLoading || isInitLoading) {
    return <Loading />;
  }

  if (!shoppingCartList.length) {
    return (
      <ImageWrapper>
        <EmptyCartImage src={emptyCart} alt="빈 장바구니" />
        <EmptyCartText>장바구니에 담긴 상품이 없습니다.</EmptyCartText>
        <Link to={PATH.PRODUCT_LIST}>
          <Button type={BUTTON_TYPE.MEDIUM} styles={{ fontWeight: 500, marginTop: '30px' }}>
            상품목록으로 가기
          </Button>
        </Link>
      </ImageWrapper>
    );
  }

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <div>
          <ShoppingCartItemModification>
            <Checkbox isChecked={isChecked} onChange={handleAllShoppingCartItemToggle}>
              <Text>{isChecked ? '선택해제' : '전체선택'}</Text>
            </Checkbox>
            <Button
              onClick={handleCheckedShoppingCartListDelete}
              type={BUTTON_TYPE.X_SMALL}
              disabled={checkedCount === 0}
            >
              상품삭제
            </Button>
          </ShoppingCartItemModification>
          <SelectedProductList
            type={SELECTED_PRODUCT_LIST_TYPE.SHOPPING_CART}
            productList={shoppingCartList}
            ListItem={ShoppingCartItem}
          />
        </div>
        <div>
          <PaymentAmountWrapper>
            <PaymentAmount
              type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART}
              price={totalPrice}
              count={checkedCount}
              onClick={handleOrderPaymentPageRouter}
            />
          </PaymentAmountWrapper>
        </div>
      </Content>

      {isDialogOpen && (
        <Dialog type={DIALOG_TYPE.CONFIRM} onConfirm={handleConfirm} onCancel={handleCancel}>
          <p>
            선택한 {checkedShoppingCartList.length}개의 상품을 <br /> 모두 삭제하시겠습니까?
          </p>
        </Dialog>
      )}
    </>
  );
};

export default ShoppingCart;
