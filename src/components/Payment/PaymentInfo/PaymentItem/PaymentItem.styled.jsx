import styled from "styled-components";
import { COLOR } from "../../../../constants/style";

export const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1.5px solid ${COLOR.GRAY.LIGHT_200};
`;

export const Img = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

export const Detail = styled.div`
  height: 7.5rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.5px;
`;

export const Name = styled.span`
  font-size: 1.25rem;
  margin-bottom: 1.75rem;
`;

export const Amount = styled.span``;
