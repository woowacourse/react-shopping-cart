import styled, { Keyframes, keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { cartListState } from "../../atoms";

export const CartAmount = () => {
  const cartAmount = useRecoilValue(cartListState).length;
  if (cartAmount === 0) return <Style.Empty />;
  return <Style.CartAmount $appear={Style.$appear}>{cartAmount}</Style.CartAmount>;
};

const Style = {
  Empty: styled.div`
    width: 26px;
    height: 26px;
  `,

  CartAmount: styled.div<{ $appear?: Keyframes }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;
    border-radius: 26px;

    padding-top: 3px;

    background-color: #04c09e;
    color: white;
    font-size: 16px;

    animation: ${(props) => props.$appear} 0.7s ease-in;
  `,

  $appear: keyframes`
    0%{
      transform: scale(0);
    }
    80%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  `,
};
