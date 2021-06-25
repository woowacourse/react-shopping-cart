import styled from "styled-components";

import { FlexBetween, FlexCenter } from "../../../sharedStyled/Flex";

const Inner = styled(FlexCenter("div"))`
  width: 300px;
  height: 180px;
  margin: auto;
  flex-wrap: wrap;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.5);
`;

const Title = styled(FlexCenter("section"))`
  flex-basis: 100%;
  height: 60%;
  border-bottom: 1px solid #e7e7e7;
`;

const ButtonControls = styled(FlexBetween("section"))`
  width: 100%;
  height: 40%;
  font-weight: bold;

  > button {
    width: 50%;
    height: 100%;
  }

  > button:hover {
    background-color: #dadada;
  }

  > button:last-child {
    border-left: 1px solid #e7e7e7;
  }
`;

export { Inner, Title, ButtonControls };
