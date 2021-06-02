import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import actions from "../../actions";
import { Button, CheckBox } from "../../Components";
import PageTitle from "../../Components/PageTitle";
import SubmitBox from "../../Components/SubmitBox";
import { COLOR } from "../../constants/theme";

import CartItemBox from "./CartItemBox";
import { RootState } from "../../store";
import { Container, Main, AllDealControlBox, Section, AllDealSelect, AllDealDelete, CartListTitle } from "./styles";
import { CartItem } from "../../interface";
import { CONFIRM_MESSAGE } from "../../constants/message";

interface CheckedList {
  [key: string]: boolean;
}

interface OrderCountList {
  [key: string]: number;
}

const Cart: FC = () => {
  const [checkedList, setCheckedList] = useState<CheckedList>({});
  const [orderCountList, setOrderCountList] = useState<OrderCountList>({});

  const history = useHistory();
  const dispatch = useDispatch();
  const cart: CartItem[] = useSelector((state: RootState) => state.cart);


  const totalPrice = cart.reduce((acc, { id, price }) => {
    return checkedList[id] ? (acc + price) * orderCountList[id] : acc;
  }, 0);

  const setCheckedListAll = (checked: boolean) => {
    setCheckedList(
      cart.reduce((acc: CheckedList, { id }) => {
        acc[id] = checked;

        return acc;
      }, {})
    );
  };

  const resetOrderCountList = () => {
    setOrderCountList(
      cart.reduce((acc: OrderCountList, { id }) => {
        acc[id] = 1;

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

  const onChangeChecked = (id: string) => {
    setCheckedList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onClickDeleteButton = (id: string) => {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      dispatch(actions.cart.delete.request([id]));
    }
  }

  const onClickDeleteSelectedButton = () => {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      const selectedIds = Object.keys(checkedList).filter((id) => checkedList[id])
      
      dispatch(actions.cart.delete.request(selectedIds));
    }
  };

  const onIncrementOrderCount = (id: string) => {
    setOrderCountList((prev) => {
      const prevCount = prev[id];

      if (prevCount >= 100) {
        return prev;
      }

      return {
        ...prev,
        [id]: prev[id] + 1,
      };
    });
  };

  const onDecrementOrderCount = (id: string) => {
    setOrderCountList((prev) => {
      const prevCount = prev[id];

      if (prevCount <= 1) {
        return prev;
      }

      return {
        ...prev,
        [id]: prev[id] - 1,
      };
    });
  };

  const onClickSubmitButton = () => {
    history.push("/order", {
      order: cart.filter(({ id }) => checkedList[id]).map((item) => ({ ...item, quantity: orderCountList[item.id] })),
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
              width="7.2rem"
              height="3.1rem"
              color={COLOR.GRAY_600}
              fontSize="1rem"
              backgroundColor="none"
              border={`1px solid ${COLOR.GRAY_200}`}
              onClick={onClickDeleteSelectedButton}
            >
              상품삭제
            </Button>
          </AllDealDelete>
        </AllDealControlBox>
        <Section>
          <CartListTitle>든든상품 ({cart.length} 개)</CartListTitle>
          <ul>
            {cart.map(({ id, name, price, imageSrc }) => (
              <li key={id}>
                <CartItemBox
                  id={id}
                  name={name}
                  price={price}
                  imageSrc={imageSrc}
                  isChecked={checkedList[id]}
                  quantity={orderCountList[id]}
                  onIncrementOrderCount={() => onIncrementOrderCount(id)}
                  onDecrementOrderCount={() => onDecrementOrderCount(id)}
                  onChangeChecked={() => onChangeChecked(id)}
                  onClickDeleteButton={() => onClickDeleteButton(id)}
                />
              </li>
            ))}
          </ul>
        </Section>
        <SubmitBox
          title="결제예상금액"
          width="448px"
          height="318px"
          target={{ name: "결제예상금액", value: `${totalPrice}원` }}
          buttonName={`주문하기(${getCheckedCount()}개)`}
          onClickSubmitButton={onClickSubmitButton}
        />
      </Main>
    </Container>
  );
};

export default Cart;
