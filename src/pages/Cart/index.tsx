import React, { useEffect, useState, VFC } from "react";
import { useDispatch } from "react-redux";

import actions from "../../actions";

import { Button, CheckBox, Confirm, Loading, PageTitle, SubmitBox } from "../../Components/@shared";
import { CartItem, Portal } from "../../Components";
import { Container, Main, AllDealControlBox, Section, AllDealSelect, AllDealDelete, CartListTitle } from "./styles";

import { COLOR } from "../../constants/theme";
import { toNumberWithComma } from "../../utils/format";
import useCart from "../../hooks/useCart";

const Cart: VFC = () => {
  const {
    cart,
    loading,
    requestErrorMessage,
    getCheckedCount,
    onChangeTotalChecked,
    getTotalCheckedIndicator,
    checkedList,
    orderCountList,
    onIncrementOrderCount,
    onDecrementOrderCount,
    onChangeChecked,
    totalPrice,
    onClickSubmitButton,
  } = useCart();

  const [isDeleteConfirmOpened, setDeleteConfirmStatus] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.cart.get.request());
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (requestErrorMessage) {
    return (
      <Container>
        <p>requestErrorMessage</p>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>장바구니</PageTitle>
      <Main>
        <AllDealControlBox>
          <AllDealSelect>
            <CheckBox checked={getCheckedCount() === cart.length} onChange={onChangeTotalChecked} />
            <span>{getTotalCheckedIndicator()}</span>
          </AllDealSelect>
          <AllDealDelete>
            <Button
              style={{
                width: "7.2rem",
                height: "3.1rem",
                color: COLOR.GRAY_600,
                fontSize: "1rem",
                backgroundColor: "none",
                border: `1px solid ${COLOR.GRAY_200}`,
              }}
              onClick={() => {
                setDeleteConfirmStatus(true);
              }}
            >
              상품삭제
            </Button>
            {isDeleteConfirmOpened && (
              <Portal>
                <Confirm
                  title="선택하신 상품을 삭제하시겠습니까?"
                  onConfirm={() => {
                    const selectedIds = Object.keys(checkedList).filter((cartId) => checkedList[cartId]);
                    dispatch(actions.cart.delete.request(selectedIds));
                  }}
                  onReject={() => {
                    setDeleteConfirmStatus(false);
                  }}
                />
              </Portal>
            )}
          </AllDealDelete>
        </AllDealControlBox>
        <Section>
          <CartListTitle>든든상품 ({cart.length} 개)</CartListTitle>
          <ul>
            {cart.map(({ cartId, productId, name, price, imageUrl }) => (
              <li key={cartId}>
                <CartItem
                  id={cartId}
                  productId={productId}
                  name={name}
                  price={price * orderCountList[cartId]}
                  imageUrl={imageUrl}
                  isChecked={checkedList[cartId]}
                  quantity={orderCountList[cartId]}
                  onIncrementOrderCount={() => onIncrementOrderCount(cartId)}
                  onDecrementOrderCount={() => onDecrementOrderCount(cartId)}
                  onChangeChecked={() => onChangeChecked(cartId)}
                />
              </li>
            ))}
          </ul>
        </Section>
        <SubmitBox
          title="결제예상금액"
          width="448px"
          height="318px"
          target={{ name: "결제예상금액", value: `${toNumberWithComma(totalPrice)}원` }}
          buttonName={`주문하기(${getCheckedCount()}개)`}
          onClickSubmitButton={onClickSubmitButton}
        />
      </Main>
    </Container>
  );
};

export default Cart;
