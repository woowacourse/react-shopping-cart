import React, { useEffect, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import actions from "../../actions";
import { RootState } from "../../store";

import { Button, CheckBox, Confirm, Loading, PageTitle, SubmitBox } from "../../Components/@shared";
import { CartItem, Portal } from "../../Components";
import { Container, Main, AllDealControlBox, Section, AllDealSelect, AllDealDelete, CartListTitle } from "./styles";

import { COLOR } from "../../constants/theme";
import { ORDER_COUNT } from "../../constants/standard";
import { PATH } from "../../constants/path";
import { toNumberWithComma } from "../../utils/format";

interface CheckedList {
  [key: string]: boolean;
}

interface OrderCountList {
  [key: string]: number;
}

const Cart: VFC = () => {
  const [checkedList, setCheckedList] = useState<CheckedList>({});
  const [orderCountList, setOrderCountList] = useState<OrderCountList>({});

  const [isDeleteConfirmOpened, setDeleteConfirmStatus] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();
  // TODO: 에러 어떻게 처리?
  const { cart, loading, requestErrorMessage } = useSelector(
    ({ cart: { cart, loading, requestErrorMessage } }: RootState) => ({
      cart,
      loading,
      requestErrorMessage,
    })
  );

  const totalPrice = cart.reduce((acc, { cartId, price }) => {
    return checkedList[cartId] ? acc + price * orderCountList[cartId] : acc;
  }, 0);

  const setCheckedListAll = (checked: boolean) => {
    setCheckedList(
      cart.reduce((acc: CheckedList, { cartId }) => {
        acc[cartId] = checked;

        return acc;
      }, {})
    );
  };

  const resetOrderCountList = () => {
    setOrderCountList(
      cart.reduce((acc: OrderCountList, { cartId }) => {
        acc[cartId] = 1;

        return acc;
      }, {})
    );
  };

  const getCheckedCount = () => {
    return Object.values(checkedList).filter(Boolean).length;
  };

  const getTotalCheckedIndicator = () => {
    const checkedCount = getCheckedCount();

    if (checkedCount === cart.length) return "선택 해제";
    if (checkedCount === 0) return "전체 선택";
    return `${checkedCount}개 선택`;
  };

  const onChangeTotalChecked = () => {
    const checkedCount = getCheckedCount();

    setCheckedListAll(checkedCount !== cart.length);
  };

  const onChangeChecked = (cartId: string) => {
    setCheckedList((prev) => ({ ...prev, [cartId]: !prev[cartId] }));
  };

  const onIncrementOrderCount = (cartId: string) => {
    setOrderCountList((prev) => {
      const prevCount = prev[cartId];

      if (prevCount >= ORDER_COUNT.MAX) {
        return prev;
      }

      return {
        ...prev,
        [cartId]: prev[cartId] + 1,
      };
    });
  };

  const onDecrementOrderCount = (cartId: string) => {
    setOrderCountList((prev) => {
      const prevCount = prev[cartId];

      if (prevCount <= ORDER_COUNT.MIN) {
        return prev;
      }

      return {
        ...prev,
        [cartId]: prev[cartId] - 1,
      };
    });
  };

  const onClickSubmitButton = () => {
    history.push(PATH.ORDER, {
      order: cart
        .filter(({ cartId }) => checkedList[cartId])
        .map((item) => ({ ...item, quantity: orderCountList[item.cartId] })),
      totalPrice,
    });
  };

  useEffect(() => {
    dispatch(actions.cart.get.request());
  }, []);

  useEffect(() => {
    setCheckedListAll(true);
    resetOrderCountList();
  }, [cart]);

  if (loading) {
    return (
      <Container>
        <Loading />
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
            {cart.map(({ cartId, name, price, imageUrl }) => (
              <li key={cartId}>
                <CartItem
                  id={cartId}
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
