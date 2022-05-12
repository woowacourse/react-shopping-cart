import styled, { keyframes, css } from "styled-components";

const CartShake = keyframes`
  0%, 50%{
    transform: rotate(0deg);
	}
  5%, 15%, 25%, 35%, 45% {
    transform: rotate(13deg);
  }
  10%, 20%, 30%, 40% {
    transform: rotate(-13deg);
  }
`;

const CartCounterMoveUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-25px);
  }
`;

const CartCounter = styled.div<{ isShowCartCounter: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  position: absolute;
  opacity: 0;
  top: -20px;
  right: 10px;
  width: 120px;
  border: 2px solid #2ac1bc;
  border-radius: 25px;
  height: 28px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.8);
  animation: ${(props) =>
    props.isShowCartCounter &&
    css`
      ${CartCounterMoveUp} 0.5s
    `};
  animation-fill-mode: forwards;
`;

const CartImage = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;

  &:hover {
    animation: ${CartShake} 2s infinite linear alternate;
  }
`;

const ProductImage = styled.img`
  width: 220px;
  height: 220px;
  cursor: pointer;
`;

const ProductWrapper = styled.div`
  width: 220px;
  height: 288px;
  display: flex;
  flex-direction: column;
`;

const ProductImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    ${ProductImage} {
      transform: scale(1.1);
    }
  }
`;

const ProductInfoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding-right: 10px;

  &:hover {
    text-decoration: underline;
  }

  &:first-child {
    font-size: 14px;
    cursor: pointer;
  }

  & span + span {
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const CartCounterButton = styled.button`
  background-color: #2ac1bc;
  border: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
  width: 25px;
  height: 20px;
  border-radius: 15px;
`;

export {
  ProductWrapper,
  ProductInfoWrapper,
  ProductInfo,
  ProductImageWrapper,
  ProductImage,
  CartImage,
  CartCounter,
  CartCounterButton,
};
