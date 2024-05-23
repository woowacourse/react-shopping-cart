import styled from 'styled-components';

export const ButtonWrapper = styled.button<{ $isActive: boolean }>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: ${({ theme }) => theme.boxHeight.md};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: center;
  background-color: ${(props) =>
    props.$isActive ? ({ theme }) => theme.color.primary.main : ({ theme }) => theme.color.primary.light};

  p {
    font-size: 16px;
    font-weight: 700;
  }
`;
