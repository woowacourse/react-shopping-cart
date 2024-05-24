import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.color.primary.light};
  padding-top: 12px;
  row-gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  column-gap: 20px;
`;

export const ItemImage = styled.img`
  display: flex;
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const ItemText = styled.p`
  font-size: ${theme.fontSize.sm};
`;

export const ItemPriceText = styled.p`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
`;

export const DeleteButton = `
  width: 40px;
  height: 24px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.light};
  padding: 0px 8px;
`;
