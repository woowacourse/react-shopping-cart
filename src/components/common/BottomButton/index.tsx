import React, { PropsWithChildren } from "react";
import { BottomButtonContainer } from "./styles";

const BottomButton: React.FC<
  PropsWithChildren<{ onClick: () => void; isDisabled: boolean }>
> = ({ children, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <BottomButtonContainer onClick={handleClick} isDisabled={isDisabled}>
      {children}
    </BottomButtonContainer>
  );
};

export default BottomButton;
