import styled from 'styled-components';

export const HeaderBox = styled.div`
  padding: 0 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: sticky;
  top: 0px;

  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  color: ${({ theme: { colors } }) => colors.white};
  background: ${({ theme: { colors } }) => colors.emerald};

  ${({ theme: { media } }) => media.sm`
  padding: 0 20px;
`};
`;
