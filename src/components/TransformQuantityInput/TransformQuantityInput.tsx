import styled, { keyframes } from "styled-components";
import cartImage from "../../assets/images/cart.png";
import arrowUpImage from "../../assets/images/arrow-up.png";
import arrowDownImage from "../../assets/images/arrow-down.png";
import useQuantityUpdater from "../../hooks/useQuantityUpdater";
import type { ProductQuantityInputProps } from "../../types";

const TransformQuantityInput = ({
  productId,
  step = 1,
}: ProductQuantityInputProps) => {
  const {
    inputValue,
    isButtonMode,
    setIsFocused,
    updateInputValue,
    initializeInputValue,
    incrementInputValue,
  } = useQuantityUpdater({ productId: productId });

  return (
    <Container>
      {isButtonMode ? (
        <ButtonMode type="button" onClick={initializeInputValue}>
          <ButtonIcon src={cartImage} />
        </ButtonMode>
      ) : (
        <InputMode>
          <IncreaseButton onClick={() => incrementInputValue(step)} />
          <Input
            value={inputValue}
            onChange={updateInputValue}
            onBlur={() => setIsFocused(false)}
          />
          <DecreaseButton onClick={() => incrementInputValue(-step)} />
        </InputMode>
      )}
    </Container>
  );
};

const colors = {
  pureWhite: "#fff",
  darkGray: "#222",
};

const Container = styled.div`
  width: 29.98px;
  height: 60px;
  text-align: center;
`;

const ButtonMode = styled.button`
  width: 30px;
  height: 26.4px;
  margin: 16.8px 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const zoomInOutAnimation = keyframes`
  0% {
    scale: 1;
  }
  50% {
    scale: 1.2;
  }
  100% {
    scale: 1;
  }
`;

const ButtonIcon = styled.img`
  width: 100%;
  height: 100%;
  animation: ${zoomInOutAnimation} 0.3s;
`;

const InputMode = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: relative;
  width: 30px;
  height: 30px;
  margin: 15px 0;
  background-color: ${colors.darkGray};
  border-radius: 6px;
  border: none;
  text-align: center;
  color: ${colors.pureWhite};
  font-family: "Rubik";
  z-index: 1;
`;

const moveUpAnimation = keyframes`
  from {
    top: 30%;
  }
  to {
    top: 0%;
  }
`;

const moveDownAnimation = keyframes`
  from {
    bottom: 30%;
  }
  to {
    bottom: 0%;
  }
`;

const IncreaseButton = styled.button`
  position: absolute;
  background: url(${arrowUpImage});
  background-size: 70% auto;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  width: 30px;
  height: 11px;
  cursor: pointer;
  top: 0;
  left: 0;
  animation: ${moveUpAnimation} 0.2s;
`;

const DecreaseButton = styled.button`
  position: absolute;
  background: url(${arrowDownImage});
  background-size: 70% auto;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  width: 30px;
  height: 11px;
  cursor: pointer;
  bottom: 0;
  left: 0;
  animation: ${moveDownAnimation} 0.2s;
`;

export default TransformQuantityInput;
