import {
  StyledContentHeaderDescription,
  StyledContentHeaderTitle,
  StyledContentHeaderWrapper,
} from "./ContentHeader.styled";

interface ContentHeaderProps {
  title: string;
  description: string;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({ title, description }) => {
  return (
    <StyledContentHeaderWrapper>
      <StyledContentHeaderTitle>{title}</StyledContentHeaderTitle>
      <StyledContentHeaderDescription>{description}</StyledContentHeaderDescription>
    </StyledContentHeaderWrapper>
  );
};
