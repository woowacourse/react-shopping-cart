import { styled } from 'styled-components';

import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';

const CartItemContainer = styled.li`
  display: flex;
  align-items: center;

  & > p {
    font-weight: 600;
  }
`;

const CartItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-right: ${({ theme }) => theme.spacer.spacing4};
`;

const CartItemImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray2};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const CartItemName = styled(Text)`
  width: 342px;
  margin-right: ${({ theme }) => theme.spacer.spacing4};
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }
`;

const CartItemPrice = styled(Text)`
  width: 130px;
  margin-right: 12px;
  text-align: right;
  letter-spacing: -0.2px;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }
`;

const CartItemDeleteButton = styled(Button)`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & path {
    stroke: ${({ theme }) => theme.color.gray3};
    transition: all 0.2s ease-in;
  }

  &:hover:enabled {
    background-color: transparent;

    & path {
      stroke: ${({ theme }) => theme.color.gray4};
    }
  }

  &.skeleton {
    border: none;
    outline: 0;
    pointer-events: none;
  }
`;

export {
  CartItemContainer,
  CartItemImageWrapper,
  CartItemImage,
  CartItemName,
  CartItemPrice,
  CartItemDeleteButton,
};
