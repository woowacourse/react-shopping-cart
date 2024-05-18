import styled from 'styled-components';
import theme from '../../styles/theme';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${theme.boxHeight});
`;

export const ErrorTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 40px;
    font-weight: ${theme.fontWeight.bold};
  }

  h2 {
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.semibold};
  }

  p {
    color: darkgray;
    font-size: ${theme.fontSize.sm};
    text-align: center;
    line-height: 1.7;
  }
`;

export const ConfirmButton = styled.button`
  width: 320px;
  height: 44px;
  border-radius: 5px;
  background: ${theme.color.primary.main};
  color: white;
  font-size: ${theme.fontSize.base};
  text-align: center;
  cursor: pointer;
`;
