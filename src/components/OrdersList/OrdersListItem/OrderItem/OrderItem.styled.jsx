import styled from "styled-components";
import { COLOR } from "../../../../constants/style";

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 1.5rem;
  border: 1px solid ${COLOR.GRAY[400]};
  border-top: 0;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Img = styled.img`
  width: 8.75rem;
  height: 8.75rem;
`;

export const Detail = styled.div`
  height: 8.75rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.5px;
`;

export const Name = styled.span`
  font-size: 1.25rem;
  margin-bottom: 1.75rem;
`;

export const PriceAmount = styled.span`
  color: ${COLOR.GRAY[700]};
`;

export const Button = styled.div`
  width: 8.5rem;
  height: 3rem;
  align-self: flex-start;

  button {
    border-radius: 2px;
  }
`;
