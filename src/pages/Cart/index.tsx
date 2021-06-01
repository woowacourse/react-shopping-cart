import React, { useEffect, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import actions from "../../actions";
import { RootState } from "../../store";

import { Button, CheckBox, Confirm, PageTitle, SubmitBox } from "../../Components/@shared";
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
  const { cart, requestErrorMessage } = useSelector(({ cart: { cart, requestErrorMessage } }: RootState) => ({
    cart,
    requestErrorMessage,
  }));

  const totalPrice = cart.reduce((acc, { cart_id, price }) => {
    return checkedList[cart_id] ? acc + price * orderCountList[cart_id] : acc;
  }, 0);

  const setCheckedListAll = (checked: boolean) => {
    setCheckedList(
      cart.reduce((acc: CheckedList, { cart_id }) => {
        acc[cart_id] = checked;

        return acc;
      }, {})
    );
  };

  const resetOrderCountList = () => {
    setOrderCountList(
      cart.reduce((acc: OrderCountList, { cart_id }) => {
        acc[cart_id] = 1;

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

  const onChangeChecked = (cart_id: string) => {
    setCheckedList((prev) => ({ ...prev, [cart_id]: !prev[cart_id] }));
  };

  const onIncrementOrderCount = (cart_id: string) => {
    setOrderCountList((prev) => {
      const prevCount = prev[cart_id];

      if (prevCount >= ORDER_COUNT.MAX) {
        return prev;
      }

      return {
        ...prev,
        [cart_id]: prev[cart_id] + 1,
      };
    });
  };

  const onDecrementOrderCount = (cart_id: string) => {
    setOrderCountList((prev) => {
      const prevCount = prev[cart_id];

      if (prevCount <= ORDER_COUNT.MIN) {
        return prev;
      }

      return {
        ...prev,
        [cart_id]: prev[cart_id] - 1,
      };
    });
  };

  const onClickSubmitButton = () => {
    history.push(PATH.ORDER, {
      order: cart
        .filter(({ cart_id }) => checkedList[cart_id])
        .map((item) => ({ ...item, quantity: orderCountList[item.cart_id] })),
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
                    const selectedIds = Object.keys(checkedList).filter((cart_id) => checkedList[cart_id]);
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
            {cart.map(({ cart_id, name, price, image_url }) => (
              <li key={cart_id}>
                <CartItem
                  id={cart_id}
                  name={name}
                  price={price * orderCountList[cart_id]}
                  imageSrc={image_url}
                  isChecked={checkedList[cart_id]}
                  quantity={orderCountList[cart_id]}
                  onIncrementOrderCount={() => onIncrementOrderCount(cart_id)}
                  onDecrementOrderCount={() => onDecrementOrderCount(cart_id)}
                  onChangeChecked={() => onChangeChecked(cart_id)}
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
