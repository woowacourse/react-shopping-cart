import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: ${({ theme }) => theme.minWidth};
  max-width: 600px;

  margin: 0 auto;

  gap: 30px;

  padding: 10px;
`;

export const Title = styled.h1`
  width: 100%;

  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.blackColor_1};

  font-weight: bold;
  line-height: 1.8;
`;

export const InformationWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 30px;
`;

export const Name = styled.div`
  width: 100%;

  font-size: 1.5rem;
  border-bottom: 3px solid ${({ theme }) => theme.greyColor_2};
  font-weight: bold;
`;

export const Price = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  & > *:first-child {
    font-weight: bold;

    font-size: 1.2rem;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
`;
