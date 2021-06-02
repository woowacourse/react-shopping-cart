import styled from "styled-components";
import { MEDIA_QUERY } from "../../constants/style";

export const Cart = styled.div``;

export const PageTitle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 4px solid #333333;
  padding: 1rem 0;
  font-size: 2rem;
  font-weight: 700;
`;

export const CartMain = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 3rem 1.5rem;

  @media (max-width: ${MEDIA_QUERY.DESKTOP}) {
    flex-direction: column;
  }
`;
