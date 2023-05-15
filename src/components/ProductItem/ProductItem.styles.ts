import styled from 'styled-components';

import { Button } from '../common/Button/Button.styles';
import { Text } from '../common/Text/Text.styles';

const ProductItemContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing2};
`;

const ItemButton = styled(Button)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacer.spacing2};
  right: ${({ theme }) => theme.spacer.spacing2};
  width: fit-content;
  min-width: 45px;
  max-width: calc(100% - ${({ theme }) => theme.spacer.spacing3});
  min-height: 45px;
  height: fit-content;
  margin: 0;
  padding: 8px;
  background-color: ${({ value, theme }) =>
    Number(value) > 0 ? theme.color.primary : theme.color.white};
  color: ${({ value, theme }) => (Number(value) > 0 ? theme.color.white : theme.color.primary)};
  font-size: 18px;
  font-weight: normal;
  white-space: normal;
  word-wrap: break-word;
  border-radius: 45px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px;
  transition: all 0.1s ease-in;

  & > svg path {
    stroke: ${({ theme }) => theme.color.primary};
    stroke-width: 2;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.color.gray2};
`;

const ItemName = styled(Text)`
  margin-top: 2px;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }
`;

const ItemPrice = styled(Text)`
  margin-top: 2px;
  font-weight: 600;
  letter-spacing: -0.2px;

  &.skeleton::after {
    font-size: 0;
    content: 'loading';
  }
`;

export { ProductItemContainer, ItemImageContainer, ItemButton, ItemImage, ItemName, ItemPrice };
