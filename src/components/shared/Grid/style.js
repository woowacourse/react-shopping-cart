import styled from 'styled-components';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  grid-column-gap: 64px;
  grid-row-gap: 32px;
`;
