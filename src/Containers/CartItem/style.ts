import styled from "styled-components";
import { Link } from "react-router-dom";

import { FlexBetween } from "../../SharedStyled/Flex";
import { COLOR } from "../../constants/theme";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 0;
  border-top: 1px solid ${COLOR.GRAY_600};
`;

const ProductImageLink = styled(Link)`
  margin-left: 0.625rem;
`;

const Desc = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

const NameLink = styled(Link)`
  color: ${COLOR.GRAY_600};
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 2;

  :hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const ControlBox = styled(FlexBetween("div"))`
  flex-direction: column;
  align-items: flex-end;
  width: 7.2rem;
  margin-left: 2.625rem;
`;

const Counter = styled.div`
  display: flex;
  width: 100%;
  height: 3.75rem;
  border: 1px solid ${COLOR.GRAY_100};

  > input {
    width: 64.3%;
    border-right: 1px solid ${COLOR.GRAY_100};
    font-size: 1.5rem;
    text-align: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    width: 35.7%;

    > button {
      width: 100%;
      height: 1.85rem;

      :last-child {
        border-top: 1px solid ${COLOR.GRAY_100};
      }
    }
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  color: ${COLOR.GRAY_600};
`;

export {
  Container,
  ProductImageLink,
  Desc,
  NameLink,
  ControlBox,
  Counter,
  Svg,
};
