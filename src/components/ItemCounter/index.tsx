import styled from "styled-components";
import CountingButton from "../Button/CountingButton/index";
import { increaseCartQuantity } from "../../recoil/selectors";
import { decreaseCartQuantity } from "../../recoil/selectors";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartQuantityAndPriceState } from "../../recoil/atoms";

const ItemCounter = ({ id }: { id: number }) => {
  const quantity = useRecoilValue(cartQuantityAndPriceState(id));
  const handleIncrease = useSetRecoilState(increaseCartQuantity);
  const handleDecrease = useSetRecoilState(decreaseCartQuantity);

  return (
    <ItemCounterContainer>
      <CountingButton type="decrease" onClick={() => handleDecrease()} />
      {quantity}
      <CountingButton type="increase" onClick={handleIncrease(id)} />
    </ItemCounterContainer>
  );
};

const ItemCounterContainer = styled.div`
  display: flex;
  gap: 4px;
  width: 80px;
  height: 24px;
`;

export default ItemCounter;
