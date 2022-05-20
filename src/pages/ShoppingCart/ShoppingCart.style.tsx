import styled from 'styled-components';

export const Container = styled.div`
  min-width: ${({ theme }) => theme.minWidth};
`;

export const Title = styled.h1`
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.blackColor_1};

  font-weight: bold;
  line-height: 1.8;
`;

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  padding: 40px 10px;

  gap: 100px;

  ${({ theme }) => theme.tablet} {
    flex-direction: column;
  }
`;
