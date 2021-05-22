import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import emptyCart from '../assets/empty-cart.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  deleteCheckedShoppingCartList,
  getShoppingCartItemList,
  toggleAllShoppingCartItem,
} from '../redux/actions/shoppingCartActions';
import useDialog from '../hooks/useDialog';
import { PATH } from '../constants/path';
import { getTotalPrice } from '../utils/totalPrice';
import {
  Button,
  Checkbox,
  PageTitle,
  Dialog,
  Loading,
  DIALOG_TYPE,
  BUTTON_TYPE,
  ShoppingCartPayment,
  ShoppingCartItemList,
} from '../components';
import useScrollPosition from '../hooks/useScrollPosition';

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

const PaymentWrapper = styled.div`
  position: sticky;
  margin-top: 50px;
  top: 50px;
`;

const Text = styled.span`
  margin-left: 12px;
`;

const ShoppingCart = () => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel } = useDialog();
  const [isInitLoading, setInitLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.shoppingCart.isAllShoppingCartItemChecked);
  const { isLoading: isDataLoading, data: shoppingCartItemList } = useSelector(
    (state) => state.shoppingCart.shoppingCartItemList
  );

  useScrollPosition(!isInitLoading);

  const checkedShoppingCartItemList = shoppingCartItemList.filter((item) => item.isChecked);
  const checkedCount = checkedShoppingCartItemList.length;

  const totalPrice = getTotalPrice(checkedShoppingCartItemList);

  useEffect(() => {
    (async () => {
      await dispatch(getShoppingCartItemList());
      setInitLoading(false);
    })();
  }, [dispatch]);

  const handleAllShoppingCartItemToggle = () => {
    dispatch(toggleAllShoppingCartItem());
  };

  const handleConfirm = () => {
    clickConfirm(() => dispatch(deleteCheckedShoppingCartList(checkedShoppingCartItemList)));
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
      orderPaymentItemList: checkedShoppingCartItemList,
      totalPrice,
    });
  };

  if (isDataLoading || isInitLoading) {
    return <Loading />;
  }

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
          <ShoppingCartItemList shoppingCartItemList={shoppingCartItemList} />
        </div>
        <div>
          <PaymentWrapper>
            <ShoppingCartPayment price={totalPrice} quantity={checkedCount} onClick={handleOrderPaymentPageRouter} />
          </PaymentWrapper>
        </div>
      </Content>

      {isDialogOpen && (
        <Dialog type={DIALOG_TYPE.CONFIRM} onConfirm={handleConfirm} onCancel={handleCancel}>
          <p>
            선택한 {checkedShoppingCartItemList.length}개의 상품을 <br /> 모두 삭제하시겠습니까?
          </p>
        </Dialog>
      )}
    </>
  );
};

export default ShoppingCart;
