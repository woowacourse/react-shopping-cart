import styled from 'styled-components';
import { StyledButton } from 'components/common/Button';
import { css } from 'styled-components';

export const CartButton = styled(StyledButton)`
  :hover {
    svg path {
      fill: ${({ theme }) => theme.colors.mint};
    }
  }
`;

export const CardDetailButton = styled(StyledButton)`
  ${({ theme }) => css`
    width: 100%;
    height: 60px;

    font-size: 20px;
    font-weight: 700;
    background: ${theme.colors.gray};
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexColumnCenter = styled(FlexCenter)`
  flex-direction: column;
`;
