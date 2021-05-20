import styled from '@emotion/styled';

type ButtonType = 'default' | 'simple';

const Container = styled.button<{ $buttonStyle: ButtonType; $opacity: number }>`
  width: 140px;
  height: 50px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  color: white;
  opacity: ${({ $opacity = 1 }) => $opacity};
  ${({ $buttonStyle }) => {
    if ($buttonStyle === 'default') {
      return `background-color: #2ac1bc;
        &:hover {
          background-color: #27a39f;
        }`;
    }
  }};

  &[disabled] {
    background-color: #dddddd;
  }

  &[disabled]:hover {
    background-color: #dddddd;
  }
`;

export { Container };
