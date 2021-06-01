import React from 'react';
import styled from 'styled-components';
import emptyCart from '../assets/empty-cart.png';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useShoppingCart from '../hooks/useShoppingCart';
import useScrollPosition from '../hooks/useScrollPosition';
import useDialog from '../hooks/useDialog';
import { PATH } from '../constants/path';
import { getTotalPrice } from '../utils/totalPrice';
import {
  Button,
  Checkbox,
  PageTitle,
  Dialog,
  BUTTON_TYPE,
  ShoppingCartPayment,
  ShoppingCartItemList,
} from '../components';

const Container = styled.div`
  ${({ theme }) => theme.content.default}
`;

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
  const { isDialogOpen, setIsDialogOpen, onConfirm, onCancel } = useDialog();
  const {
    shoppingCartItemList,
    isAllShoppingCartItemChecked,
    toggleAllShoppingCartItem,
    deleteCheckedShoppingCartItem,
  } = useShoppingCart();

  const history = useHistory();

  useScrollPosition(PATH.SHOPPING_CART);

  const checkedShoppingCartItemList = shoppingCartItemList.filter((item) => item.isChecked);
  const checkedCount = checkedShoppingCartItemList.length;

  const totalPrice = getTotalPrice(checkedShoppingCartItemList);

  const handleAllShoppingCartItemToggle = () => {
    toggleAllShoppingCartItem();
  };

  const handleConfirm = () => {
    onConfirm(() => deleteCheckedShoppingCartItem(checkedShoppingCartItemList));
  };

  const handleCancel = () => {
    onCancel();
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
    <Container>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <div>
          <ShoppingCartItemModification>
            <Checkbox isChecked={isAllShoppingCartItemChecked} onChange={handleAllShoppingCartItemToggle}>
              <Text>{isAllShoppingCartItemChecked ? '선택해제' : '전체선택'}</Text>
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
        <Dialog onConfirm={handleConfirm} onCancel={handleCancel}>
          <p>
            선택한 {checkedShoppingCartItemList.length}개의 상품을 <br /> 모두 삭제하시겠습니까?
          </p>
        </Dialog>
      )}
    </Container>
  );
};

export default ShoppingCart;
