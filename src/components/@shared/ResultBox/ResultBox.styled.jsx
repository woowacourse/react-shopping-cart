import styled from "styled-components";
import { MEDIA_QUERY, COLOR } from "../../../constants/style";

export const ResultBox = styled.aside`
  width: 28rem;
  min-width: 18rem;
  height: fit-content;

  flex-shrink: 0;
  border: 1px solid ${COLOR.GRAY_300};
  position: sticky;
  top: 8rem;

  @media (max-width: ${MEDIA_QUERY.DESKTOP}) {
    width: 100%;
  }
`;

export const Title = styled.div`
  padding: 2rem;
  border-bottom: 3px solid ${COLOR.GRAY_300};
  font-size: 1.5rem;
`;

export const Main = styled.div`
  padding: 2rem;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 4rem;

  span {
    position: relative;
    margin: 0.25rem;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 0.5;
      width: 100%;
      height: 8px;
      background-color: ${COLOR.CYAN_400};
    }
  }
`;

export const Button = styled.div`
  font-size: 1.5rem;
`;
