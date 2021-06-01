import styled from "styled-components";
import { COLOR } from "../../../../constants/style";
import SCREENS from "../../../../constants/screens";

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid ${COLOR.GRAY.LIGHT_200};
  border-top: 0;
  justify-content: space-between;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  height: 100%;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 0;
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  width: 8.75rem;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
`;

export const Detail = styled.div`
  width: 10.5rem;
  height: 100%;

  display: flex;
  flex-direction: column;
  letter-spacing: 0.5px;

  & > * {
    margin-bottom: 0.75rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    width: 100%;
    margin-left: 1rem;
    & > *:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`;

export const Name = styled.span`
  font-size: 1.25rem;
`;

export const PriceAmount = styled.span`
  color: ${COLOR.GRAY.DARK_200};
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    flex-direction: row;
  }
`;

export const Price = styled.span`
  margin-right: 1rem;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    &:after {
      content: "/";
      margin-left: 1rem;
    }
  }
`;

export const Amount = styled.span``;

export const Button = styled.div`
  width: 100%;
  height: 3rem;
  align-self: flex-start;
  margin-left: auto;

  button {
    border-radius: 2px;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    width: 8.5rem;
  }
`;
