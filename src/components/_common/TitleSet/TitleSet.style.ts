import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  flex-direction: column;

  row-gap: 12px;
`;

const Title = styled.h1`
  height: 36px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  font-size: 12px;
  line-height: 15px;
`;

export const S = {
  Wrapper,
  Title,
  SubTitle,
};
