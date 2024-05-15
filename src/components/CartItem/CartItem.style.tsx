import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.color.primary.light};
  padding-top: 12px;
  row-gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  column-gap: 24px;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: center;
  padding: 0px 8px;
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

export const ItemNameText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ItemPriceText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

export const ItemQuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    width: 30px;
    text-align: center;
  }
`;

export const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};

  img {
    width: 12px;
    height: 12px;
  }
`;
