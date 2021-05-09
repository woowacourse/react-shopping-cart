import styled from '@emotion/styled';

const Container = styled.button`
  width: 140px;
  height: 50px;
  font-size: 20px;
  background-color: #2ac1bc;
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #27a39f;
  }

  &[disabled] {
    background-color: #dddddd;
  }

  &[disabled]:hover {
    background-color: #dddddd;
  }
`;

export { Container };
