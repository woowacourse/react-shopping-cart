import styled from 'styled-components';
import theme from '../../../styles/theme';

const isActiveMapper = (isActive: boolean) => {
  if (!isActive) {
    return `
      background-color: ${theme.color.primary.light};
      color: white;
    `;
  }

  return `
      border: 1px solid ${theme.color.primary.light};
      background-color: white;
      color: ${theme.color.primary.semiLight};
      cursor: pointer;

      &:hover {
        background-color: #efefef;
      }
    `;
};

export const Layout = styled.button<{ $isActive: boolean; $customStyle: string }>`
  width: 100%;
  padding: 15px 0;
  border-radius: 5px;
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  ${(props) => isActiveMapper(props.$isActive)}
  ${(props) => props.$customStyle}
`;
