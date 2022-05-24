import styled from "styled-components";

const StyledNumberInputContainer = styled.div`
  display: flex;

  width: 112px;
  height: 60px;
`;

const StyledInput = styled.input`
  text-align: center;

  width: 72px;
  height: 100%;

  font-size: 24px;
  line-height: 19px;
  color: ${({ theme }) => theme.color.grey_700};

  border: 1px solid ${({ theme }) => theme.color.grey_100};

  :focus {
    outline: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledArrowButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  border: none;
`;

const StyledArrowButton = styled.button`
  width: 40px;
  height: 50%;

  font-size: 10px;
  border: 1px solid ${({ theme }) => theme.color.grey_100};
  background-color: transparent;

  :hover {
    cursor: pointer;
  }
`;

export {
  StyledNumberInputContainer,
  StyledInput,
  StyledArrowButtonContainer,
  StyledArrowButton,
};
