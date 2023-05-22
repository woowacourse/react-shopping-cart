import { styled } from 'styled-components';
import { FlexColWrapper, FlexWrapper } from '../../pages/Cart/Cart.style';

export const StyleCartWrapper = styled(FlexColWrapper)`
  flex: 2;
`;

export const StyleCartItemListWrapper = styled(FlexWrapper)`
  column-gap: 1rem;
  width: 100%;
  margin: 1rem;
  border: ${({ theme }) => theme.lightColor} 1px solid;
  padding: 1rem;
  border-radius: 8px;
  justify-content: start;
  align-items: center;
`;

export const StyleDeleteCheckedBox = styled.button`
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.lightColor};
  height: 3rem;
  padding: 0 1rem;
  font-weight: 600;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.dangerColor};
  }
`;

export const StyleCheckAllSpan = styled.span`
  font-size: 1.6rem;
  width: 12rem;
`;
