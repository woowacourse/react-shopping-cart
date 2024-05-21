import styled from "@emotion/styled";

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
    color: ${({ theme }) => theme.colors.semiBlack};
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

export { StoryContainer, StoryInfoContainer };
