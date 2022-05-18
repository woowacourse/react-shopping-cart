import styled from "@emotion/styled";

export const DetailPageContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const DetailContainer = styled.div`
  min-width: 700px;
  @media screen and (max-width: 850px) {
    min-width: 300px;
  }
`;
