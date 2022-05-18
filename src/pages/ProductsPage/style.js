import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 30px;
  padding: 60px;
  overflow-y: auto;
`;
