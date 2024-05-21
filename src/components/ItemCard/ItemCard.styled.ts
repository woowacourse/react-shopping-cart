import styled from 'styled-components';

export const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
  gap: 1rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 0.5px 0 0 0;
  border-style: solid;
`;

export const CardContent = styled.div`
  display: flex;
  gap: 2.4rem;
`;

export const ItemImg = styled.img`
  width: 11.2rem;
  height: 11.2rem;
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0.9rem 0;
  box-sizing: border-box;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

export const CardQuantityButton = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ItemName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

export const ItemPrice = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.47rem;
`;

export const QuantityCount = styled(ItemName)``;

export const Button = styled.button`
  min-width: 2.4rem;
  min-height: 2.4rem;
  border: 1px solid gray;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-sizing: border-box;
  color: rgba(54, 54, 54, 1);
`;
