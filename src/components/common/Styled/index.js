import styled from 'styled-components';

export const flexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const flexColumnCenter = styled(flexCenter)`
  flex-direction: column;
`;
