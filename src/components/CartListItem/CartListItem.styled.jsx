import styled from "styled-components";
import { COLOR } from "../../constants/style";
import SCREENS from "../../constants/screens";

export const CartListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid ${COLOR.GRAY.LIGHT_200};

  padding: 0.75rem 0;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    padding: 1.75rem 0;
  }
`;

export const Detail = styled.div`
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 7rem;
  margin-left: 0.5rem;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    width: 9rem;
  }
`;

export const Name = styled.span`
  font-size: 1rem;
  margin-left: 0.5rem;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    font-size: 1.25rem;
  }
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  & > div {
    display: flex;
    align-items: center;
  }
`;

export const Price = styled.span`
  white-space: nowrap;
`;
