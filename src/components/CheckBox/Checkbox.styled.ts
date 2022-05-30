import styled from 'styled-components';

export const Checkbox = styled.input`
  appearance: none;
  border: 1px solid #2ac1bc;
  border-radius: 2px;
  min-width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :checked {
    background-color: ${({ theme: { colors } }) => colors.emerald};
  }

  :after {
    content: '✔';
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: ${({ theme: { colors } }) => colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :disabled {
    pointer-events: none;
    background-color: ${({ theme: { colors } }) => colors.gray};

    :after {
      color: ${({ theme: { colors } }) => colors.emerald};
    }
  }
`;
