import styled from '@emotion/styled';

const Container = styled.button`
  cursor: pointer;

  border: none;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;
  padding: 0.35rem;

  &::before {
    content: '\\${({ icon }) => icon}';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;
  }

  &:hover {
    color: #06f;
    background-color: #f3f3f3;
  }
`;

export default Container;
