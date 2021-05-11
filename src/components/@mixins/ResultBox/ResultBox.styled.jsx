import styled from "styled-components";
import { COLOR } from "../../../constants/style";

export const ResultBox = styled.aside`
  width: 28rem;
  height: fit-content;

  flex-shrink: 0;
  border: 1px solid ${COLOR.GRAY.LIGHT_300};

  position: sticky;
  top: 8rem;
`;

export const Title = styled.div`
  padding: 2rem;
  border-bottom: 3px solid ${COLOR.GRAY.LIGHT_300};
  font-size: 1.5rem;
`;

export const Main = styled.div`
  padding: 2rem;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 4rem;

  span {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 0.5;
      width: 100%;
      height: 8px;
      background-color: ${COLOR.CYAN.PRIMARY};
    }
  }
`;

export const Button = styled.div`
  font-size: 1.5rem;
`;
