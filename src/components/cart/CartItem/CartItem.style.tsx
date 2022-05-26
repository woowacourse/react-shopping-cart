import styled from 'styled-components';
export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 10px 0;
  gap: 20px;

  border-bottom: 1px solid ${({ theme }) => theme.greyColor_1};
`;
export const ImageWrapper = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NameWrapper = styled.div`
  min-width: 50px;
  font-size: 1.3rem;

  cursor: pointer;

  flex: 1;

  ${({ theme }) => theme.tablet} {
    font-size: 1.1rem;
  }

  display: flex;
  align-items: center;
`;

export const PriceWrapper = styled.div`
  min-width: 100px;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 30px;
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span``;
