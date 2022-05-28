import styled from 'styled-components';

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
