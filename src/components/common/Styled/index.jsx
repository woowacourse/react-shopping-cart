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

export const OrderButton = styled(StyledButton)`
  width: 404px;
  height: 60px;
  font-weight: 400;
  font-size: 22px;
  color: ${COLOR.DEFAULT_FONT};
  background: ${COLOR.ORDER_BUTTON};

  :hover {
    background: ${COLOR.ORDER_BUTTON_HOVER};
  }
`;

export const UpCountButton = styled(StyledButton)`
  width: 42px;
  height: 30px;
  border: 1px solid #dddddd;

  :hover {
    background: #2ac1bc;
    color: #fff;
  }
`;

export const DownCountButton = styled(UpCountButton)`
  transform: rotate(180deg);
`;

export const DeleteButton = styled(StyledButton)`
  width: fit-content;
  height: fit-content;
  font-size: 22px;
  background: transparent;

  &:hover {
    background: gray;
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
