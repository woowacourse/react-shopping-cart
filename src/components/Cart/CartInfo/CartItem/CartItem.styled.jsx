import styled from "styled-components";
import { BREAK_POINT, COLOR } from "../../../../constants/style";

export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 0;
  border-bottom: 1.5px solid ${COLOR.GRAY[400]};

  @media (max-width: ${BREAK_POINT.MOBILE}) {
    height: 15rem;
  }
`;

export const Detail = styled.div`
  display: flex;
  column-gap: 1rem;
`;

export const Img = styled.img`
  width: 9rem;
  height: 9rem;

  @media (max-width: ${BREAK_POINT.MOBILE}) {
    width: 4.5rem;
    height: 4.5rem;
  }
`;

export const Name = styled.span`
  max-width: 18rem;
  max-height: 3rem;
  margin-right: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: ${BREAK_POINT.DESKTOP}) {
    max-width: 100%;
  }
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 9rem;

  @media (max-width: ${BREAK_POINT.MOBILE}) {
  }
`;

export const Price = styled.span``;
