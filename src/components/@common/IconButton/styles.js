import styled from '@emotion/styled';

const Container = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &::before {
    content: '\\${({ icon }) => icon}';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;
  }
`;

export default Container;
