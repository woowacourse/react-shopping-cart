import styled from "@emotion/styled";

export const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

export const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Info = styled.div`
  flex: 1;
`;

export const Name = styled.p`
  font-weight: 700;
  font-size: 14px;
  margin: 0 0 4px 0;
`;

export const Price = styled.p`
  font-weight: 500;
  font-size: 13px;
  margin: 0;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > p {
    width: 24px;
    text-align: center;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    color: #f00;
  }
`;

export const TotalPriceWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 15px;
  border-top: 1px solid #eee;
`;
