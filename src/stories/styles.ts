import styled from 'styled-components';

const StoryContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StoryInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > h6 {
    font-size: 16px;
    font-weight: 500;
  }
`;

export { StoryContainer, StoryInfoContainer };
