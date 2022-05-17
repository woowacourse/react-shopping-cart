import styled from "styled-components";
import FlexBox from "../../styles/FlexBox";

const NotFoundWrapper = styled(FlexBox)`
  & div {
    margin-bottom: 10px;
  }

  & button {
    border: none;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.GRAY_800};
    color: ${({ theme }) => theme.colors.GRAY_50};
    border-radius: 10px;
  }
`;

export { NotFoundWrapper };
