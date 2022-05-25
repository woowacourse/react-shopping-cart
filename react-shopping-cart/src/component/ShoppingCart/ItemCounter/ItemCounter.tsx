import { useState } from "react";
import { useDispatch } from "react-redux";

import { CountBox, CounterButton } from "./ItemCounter.style";

import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from "redux/carts/carts.action";

function ItemCounter({ id }: { id: string }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const increaseCount = () => {
    setCount((prev) => prev + 1);
    dispatch(increaseProductQuantity(id));
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      dispatch(decreaseProductQuantity(id));
    }
  };

  return (
    <RowFlexWrapper border="1px solid" bColor="gray_04" width="70px">
      <CountBox>{count}</CountBox>
      <ColumnFlexWrapper>
        <CounterButton onClick={increaseCount}>▲</CounterButton>
        <CounterButton onClick={decreaseCount}>▼</CounterButton>
      </ColumnFlexWrapper>
    </RowFlexWrapper>
  );
}

export default ItemCounter;
