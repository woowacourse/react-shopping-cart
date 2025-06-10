import styled from '@emotion/styled';

export const Container = styled.main`
  padding: 30px 24px;
  height: calc(100vh - 130px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const Title = styled.h1`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;
