import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

export const Amount = styled.div`
  font-size: 1.3rem;
  padding: 20px 0;
  border-bottom: 2px solid ${({ theme }) => theme.greyColor_1};
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 20px;
  line-height: 0;
`;
