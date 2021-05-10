import React, {
  ChangeEventHandler,
  ChangeEvent,
  useEffect,
  useState,
  VFC,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import { Button, CheckBox } from "../../Components";
import PageTitle from "../../Components/PageTitle";
import SubmitBox from "../../Components/SubmitBox";
import { COLOR } from "../../constants/theme";

import CartItem from "../../Containers/CartItem";
import { RootState } from "../../store";
import {
  Main,
  AllDealControlBox,
  Section,
  AllDealSelect,
  AllDealDelete,
  CartListTitle,
} from "./styles";

interface CheckedList {
  [key: string]: boolean;
}

const Cart: VFC = () => {
  const [checkedList, setCheckedList] = useState<CheckedList>({});
  const dispatch = useDispatch();
  const { cart, requestErrorMessage } = useSelector(
    ({ cart: { cart, requestErrorMessage } }: RootState) => ({
      cart,
      requestErrorMessage,
    })
  );

  const totalPrice = cart.reduce((acc, { price }) => acc + price, 0);

  useEffect(() => {
    dispatch(actions.cart.get.request());
  }, []);

  useEffect(() => {
    const initialCheckList = cart.reduce((acc: CheckedList, { id }) => {
      acc[id] = true;

      return acc;
    }, {});

    setCheckedList(initialCheckList);
  }, [cart]);

  const onChangeTotalChecked = () => {};

  const onChangeChecked: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.dataset.productId === undefined) {
      return;
    }

    const id = target.dataset.productId;

    setCheckedList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCheckedCount = () => {
    return Object.values(checkedList).filter((checked) => checked).length;
  };
  const getTotalCheckedIndicator = () => {
    const checkedCount = getCheckedCount();

    if (checkedCount === cart.length) return "선택 해제";
    if (checkedCount === 0) return "전체 선택";
    return `${checkedCount}개 선택`;
  };

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Main>
        <AllDealControlBox>
          <AllDealSelect>
            <CheckBox
              checked={getCheckedCount() === cart.length}
              onChange={onChangeTotalChecked}
            />
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
              onClick={() => {}}
            >
              상품삭제
            </Button>
          </AllDealDelete>
        </AllDealControlBox>
        <Section>
          <CartListTitle>든든상품 ({cart.length} 개)</CartListTitle>
          <ul>
            {cart.map(({ id, name, price, quantity }) => (
              <li key={id}>
                <CartItem
                  id={id}
                  name={name}
                  price={price}
                  quantity={quantity}
                  isChecked={checkedList[id]}
                  onChangeChecked={onChangeChecked}
                  onClickDeleteButton={() => {}}
                />
              </li>
            ))}
          </ul>
        </Section>
        {/* TODO Position: relative <-> fixed */}
        <SubmitBox
          title="결제예상금액"
          width="448px"
          height="318px"
          target={{ name: "결제예상금액", value: `${totalPrice}원` }}
          buttonName={`주문하기(${cart.length}개)`}
        />
      </Main>
    </>
  );
};

export default Cart;
