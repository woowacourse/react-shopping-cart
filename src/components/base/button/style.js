import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: fit-content;
  text-align: center;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;

  ${({ boldText }) =>
    boldText &&
    css`
      font-weight: 900;
      font-size: 40px;
      line-height: 58px;
    `}

  ${({ normalText }) =>
    normalText &&
    css`
      font-weight: 500;
      font-size: 24px;
      line-height: 12px;
    `}
`;

export default StyledButton;
