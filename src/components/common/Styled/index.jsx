import styled from 'styled-components';
import { StyledButton } from 'components/common/Button';

export const CartButton = styled(StyledButton)`
  :hover {
    svg path {
      fill: #2ac1bc;
    }
  }
`;

export const CardDetailButton = styled(StyledButton)`
  width: 100%;
  height: 60px;
  background: #73675c;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  :hover {
    background: #2ac1bc;
  }
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
