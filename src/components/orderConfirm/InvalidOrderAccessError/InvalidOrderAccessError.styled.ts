import styled from 'styled-components';

export const InvalidOrderAccessError = styled.section`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    margin-bottom: 1rem;
    width: 48px;
    height: 48px;
  }
`;

export const Message = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;

export const ButtonText = styled.span`
  font-size: 18px;
`;
