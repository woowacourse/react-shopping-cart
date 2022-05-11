import styled from 'styled-components';

export const Container = styled.div``;

export const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const Button = styled.div`
  padding: 10px;

  border: none;
  border-radius: 4px;

  background-color: ${({ theme, isCurrent }) => (isCurrent ? theme.mainColor : 'transparent')};
  color: ${({ theme, isCurrent }) => isCurrent && theme.textColorWhite};

  &:hover {
    background-color: ${({ theme }) => theme.mainColor};
    color: ${({ theme }) => theme.textColorWhite};
  }
`;
