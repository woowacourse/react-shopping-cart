import styled from "styled-components";
import { COLOR } from "../../../../constants/style";

export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 0;

  border-bottom: 1.5px solid ${COLOR.GRAY.LIGHT_200};
`;

export const Detail = styled.div`
  display: flex;
  column-gap: 1rem;
`;

export const ImageContainer = styled.div`
  width: 9rem;
  height: 9rem;
`;

export const Name = styled.span`
  font-size: 1.25rem;
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 9rem;
`;
