import styled from 'styled-components';

import { ButtonProps } from '../common/Button/Button';
import { Button } from '../common/Button/Button.styles';
import { Text } from '../common/Text/Text.styles';

interface ItemButtonProps extends ButtonProps {
  isAdded: boolean;
}

const ProductItemContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const ItemButton = styled(Button)<ItemButtonProps>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 45px;
  height: 45px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isAdded, theme }) => (isAdded ? theme.color.primary : theme.color.white)};
  font-size: 18px;
  font-weight: normal;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px;

  & > svg path {
    stroke: #04c09e;
    stroke-width: 2;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.gray2};
`;

const ItemName = styled(Text)`
  margin-top: 2px;
`;

const ItemPrice = styled(Text)`
  margin-top: 2px;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

export { ProductItemContainer, ItemImageContainer, ItemButton, ItemImage, ItemName, ItemPrice };
