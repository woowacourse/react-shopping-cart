import styled from "@emotion/styled";

export const Container = styled.div`
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: none;
`;

export const Quantity = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  font-weight: 500;
  font-size: 12px;

  color: #000000;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  background: #ffffff;

  border: 1px solid #0000001a;
  border-radius: 8px;

  transition: background-color 0.2s ease-in-out;
  :hover {
    background: #004aeb94;
  }
  cursor: pointer;

  :disabled {
    background: rgba(33, 33, 33, 0.2);
    cursor: not-allowed;
  }
`;

export const OperatorIcon = styled.img`
  width: 12px;
`;
