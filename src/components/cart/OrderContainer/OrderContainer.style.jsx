import styled from 'styled-components';

export const Container = styled.section`
  border: 1px solid ${({ theme }) => theme.colorConfig.secondary};
  width: 30%;
  height: max-content;
`;

export const Title = styled.h1`
  border-bottom: 1px solid ${({ theme }) => theme.colorConfig.secondary};
  padding: 15px;
  font-weight: normal;
  font-size: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 15px;
`;

export const ExpectedPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 20px;
`;

export const Label = styled.p``;

export const Price = styled.p``;

export const Button = styled.button`
  width: 100%;
  padding: 15px;

  border: none;

  background-color: ${({ theme }) => theme.colorConfig.primary};
  color: ${({ theme }) => theme.colorConfig.textWhite};
  font-size: 24px;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colorConfig.secondary};

    &:hover {
      opacity: 1;
    }
  }
`;
