import styled from 'styled-components';

export const Container = styled.div`
  min-width: 250px;
  height: 318px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.greyColor_1};

  padding: 10px;
`;

export const Title = styled.div`
  font-size: 1.3rem;
  border-bottom: 1px solid ${({ theme }) => theme.greyColor_1};
  padding: 10px;
`;
export const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
