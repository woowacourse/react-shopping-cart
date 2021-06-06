import styled from 'styled-components';

export const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 2rem;
  height: 100%;

  & > button {
    height: 50%;
    border: 1px solid var(--color-grey-50);
    font-size: 0.4rem;

    &:first-child {
      border-bottom: 0;
    }
  }
`;
