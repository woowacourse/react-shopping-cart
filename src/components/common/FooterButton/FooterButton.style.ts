import styled from '@emotion/styled';

export const FooterButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 64px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #222222;
    transition: 0.3s ease;
  }

  &:disabled {
    background: #bebebe;
    cursor: default;
  }
`;
