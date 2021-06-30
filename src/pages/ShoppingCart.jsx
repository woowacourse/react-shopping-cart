import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button, { BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import { deleteCheckedShoppingCartList, fetchShoppingCartList, toggleAllShoppingCartItem } from '../redux/shoppingCart';
import emptyCart from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';
import { PATH } from '../constants/path';
import Dialog, { DIALOG_TYPE } from '../components/dialog/Dialog';
import useDialog from '../hooks/useDialog';
import ShoppingCartItemList from '../components/shoppingCart/ShoppingCartItemList';
import useShoppingCart from '../hooks/useShoppingCart';
import ShoppingCartPayment from '../components/shoppingCart/ShoppingCartPayment';

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

const ShoppingCart = () => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel } = useDialog();

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    shoppingCartItemList,
    checkedShoppingCartItemList,
    checkedCount,
    isAllShoppingCartItemChecked,
    shoppingCartTotalPrice,
  } = useShoppingCart();

  const handleAllShoppingCartItemToggle = () => {
    dispatch(toggleAllShoppingCartItem());
  };

  const handleConfirm = () => {
    clickConfirm(dispatch.bind(null, deleteCheckedShoppingCartList(checkedShoppingCartItemList)));
  };

  const handleCancel = () => {
    clickCancel();
  };

  const handleCheckedShoppingCartListDelete = () => {
    setIsDialogOpen(true);
  };

  const handleOrderPaymentPageRouter = () => {
    history.push(PATH.ORDER_PAYMENT, {
      orderPaymentItemList: checkedShoppingCartItemList,
      orderPaymentTotalPrice: shoppingCartTotalPrice,
    });
  };

  useEffect(() => {
    dispatch(fetchShoppingCartList());
  }, [dispatch]);

  if (!shoppingCartItemList.length) {
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
            <Checkbox isChecked={isAllShoppingCartItemChecked} onChange={handleAllShoppingCartItemToggle}>
              {isAllShoppingCartItemChecked ? '선택해제' : '전체선택'}
            </Checkbox>
            <Button onClick={handleCheckedShoppingCartListDelete} type={BUTTON_TYPE.X_SMALL} disabled={!checkedCount}>
              상품삭제
            </Button>
          </ShoppingCartItemModification>
          <ShoppingCartItemList shoppingCartItemList={shoppingCartItemList} />
        </div>
        <div>
          <PaymentAmountWrapper>
            <ShoppingCartPayment
              price={shoppingCartTotalPrice}
              quantity={checkedCount}
              onClick={handleOrderPaymentPageRouter}
            />
          </PaymentAmountWrapper>
        </div>
      </Content>

      {isDialogOpen && (
        <Dialog type={DIALOG_TYPE.CONFIRM} onConfirm={handleConfirm} onCancel={handleCancel}>
          <p>
            선택한 {checkedCount}개의 상품을 <br /> 모두 삭제하시겠습니까?
          </p>
        </Dialog>
      )}
    </>
  );
};

export default ShoppingCart;
