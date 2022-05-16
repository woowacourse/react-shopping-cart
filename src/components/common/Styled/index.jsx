import styled from 'styled-components';
import { StyledButton } from 'components/common/Button';
import { COLOR } from 'constants';

export const CartButton = styled(StyledButton)`
  :hover {
    svg path {
      fill: ${COLOR.CART_BUTTON_HOVER};
    }
  }
`;

export const CardDetailButton = styled(StyledButton)`
  width: 100%;
  height: 60px;
  background: ${COLOR.CART_BUTTON};
  font-weight: 700;
  font-size: 20px;
  :hover {
    background: ${COLOR.CART_BUTTON_HOVER};
  }
`;

export const flexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const flexColumnCenter = styled(flexCenter)`
  flex-direction: column;
`;
