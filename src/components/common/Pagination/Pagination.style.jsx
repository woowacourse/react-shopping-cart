import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';

export const Container = styled.div`
  min-width: ${({ theme }) => theme.minWidth};
`;

export const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const CustomLink = styled(Link)`
  ${({ $isCurrent }) => $isCurrent && 'pointer-events: none'}
`;

export const Button = styled.div`
  padding: 20px;

  border: none;
  border-radius: 4px;

  ${({ theme, $isCurrent }) => css`
    background-color: ${$isCurrent ? theme.colors.primary : 'transparent'};
    color: ${$isCurrent && theme.colors.textWhite};

    &:hover {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.textWhite};
    }
  `}
`;
