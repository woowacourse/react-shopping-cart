import { styled } from "styled-components";
import { LoadingSpinner } from "../assets";

export const Loading = () => {
  return (
    <Wrapper>
      <img src={LoadingSpinner} alt="로딩" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 220px;

  & > img {
    width: 100px;
    height: 100px;
  }
`;
