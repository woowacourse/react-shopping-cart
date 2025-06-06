import styled from "@emotion/styled";

export const Button = styled.button`
  width: 100%;
  max-width: 430px;
  padding: 10px 8px;

  background-color: #ffffff;
  color: #000000;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #33333340;
  border-radius: 6px;

  font-size: 16px;
  font-weight: 700;

  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;
