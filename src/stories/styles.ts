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
    color: ${({ theme }) => theme.color.gray5};
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

export { StoryContainer, StoryInfoContainer };
