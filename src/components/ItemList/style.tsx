import styled from 'styled-components';

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const TotalSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${(props) => props.theme.typography.caption}
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Divider = styled.div`
  border: 0.5px solid ${(props) => props.theme.color.borderGray};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  border-radius: 8px;

  cursor: pointer;
`;

export const DeleteButton = styled.button`
  width: 2.5rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 4px;

  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.color.captionBlack};

  background-color: ${(props) => props.theme.color.white};

  cursor: pointer;
`;

export const ItemImg = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 8px;
`;

export const ItemInfoContainer = styled.section`
  display: flex;
  gap: 1.5rem;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ItemName = styled.p`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.color.captionBlack};
`;

export const ItemPrice = styled.p`
  ${(props) => props.theme.typography.price};
  color: ${(props) => props.theme.color.black};
`;

export const ItemQuantityAdjustment = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8125rem;
`;

// export const ItemQuantityButton = styled.button``;

export const ItemQuantity = styled.p`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.color.captionBlack};
`;
